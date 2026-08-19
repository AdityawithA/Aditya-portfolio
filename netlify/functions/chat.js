exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "GROQ_API_KEY is not configured.",
        }),
      };
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content: `You are Aditya Kumar's personal portfolio AI assistant.

Answer questions about Aditya using the following information:

Name: Aditya Kumar
Education: B.Tech Computer Science and Design
College: Dr. B.C. Roy Engineering College, Durgapur

Skills:
Python, Java, JavaScript, HTML, CSS, React, Flask, MySQL, SQLite, Git, GitHub, AI/ML.

Projects:
- InterviewAce AI — AI-powered interview preparation platform.
- CampusSync — college event and student management platform.
- TypeRush — typing speed application.
- SMS Spam Detection — machine learning spam classifier.
- Breast Cancer Detection — machine learning classification project.
- Dezinova — departmental club website.

Aditya is interested in software engineering, full-stack development and AI engineering.

Be professional, concise and helpful.
If something is not present in the provided information, say that the visitor should check Aditya's portfolio or contact him directly.
Never invent achievements, companies, experience or personal information.`,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", data);

      return {
        statusCode: 502,
        body: JSON.stringify({
          error: "AI provider request failed.",
          details: data?.error?.message || "Unknown Groq error",
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "No response generated.",
      }),
    };
  } catch (error) {
    console.error("Function error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error.",
        details: error.message,
      }),
    };
  }
};