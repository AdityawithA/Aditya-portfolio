const PROFILE = `
You are Aditya Kumar's personal portfolio AI assistant.

Answer questions about Aditya accurately and concisely for recruiters, hiring managers, collaborators, and visitors.

VERIFIED PROFILE:
- Name: Aditya Kumar.
- Education: B.Tech in Computer Science and Design at Dr. BC Roy Engineering College, Durgapur; expected graduation 2027.
- Career focus: full-stack web development and AI engineering.
- Skills/technologies mentioned in his portfolio work: Python, Java, JavaScript, HTML, CSS, Flask, Node.js, MySQL, SQLite, Git/GitHub, Android/Kotlin, machine learning libraries, REST/API integrations, Render and Netlify.
- InterviewAce AI: AI-powered interview preparation platform using Flask/Python, Gemini/Groq API integration, SQLite, authentication, mock interviews, role-specific questions, response evaluation, performance tracking, and Render deployment.
- CampusSync: college platform for events, announcements, student activities, authentication, event registration, role-based access control and dashboards.
- TypeRush: typing/racing web project.
- SMS Spam Detection: ML-powered Flask application.
- Breast Cancer Detection: ML project/application; the project work reported about 95% accuracy.
- Dezinova: departmental club website.
- Portfolio: https://aditya-portfoli0.netlify.app/
- GitHub: https://github.com/AdityawithA
- LinkedIn: https://www.linkedin.com/in/aditya-kumar-892099293/
- Email: adityakumar2655@gmail.com

RULES:
1. Only use the supplied information.
2. Never invent employers, awards, metrics, dates, technologies, responsibilities, or project features.
3. If information is unknown, say it is not listed and recommend checking the resume or contacting Aditya.
4. Keep answers recruiter-friendly and concise.
5. Do not claim unlisted professional experience.
6. You are an AI assistant for the portfolio; do not impersonate Aditya.
7. If asked for contact information, provide the listed links/email.
`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed." }) };

  const key = process.env.GROQ_API_KEY;
  if (!key) return { statusCode: 500, body: JSON.stringify({ error: "GROQ_API_KEY is not configured." }) };

  try {
    const body = JSON.parse(event.body || "{}");
    const message = String(body.message || "").trim();
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    if (!message) return { statusCode: 400, body: JSON.stringify({ error: "Message is required." }) };

    const messages = [
      { role: "system", content: PROFILE },
      ...history.filter(x => x && ["user","assistant"].includes(x.role)).map(x => ({ role:x.role, content:String(x.content).slice(0,4000) })),
      { role: "user", content: message.slice(0,4000) }
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model:"llama-3.3-70b-versatile", messages, temperature:0.2, max_tokens:500 })
    });

    const data = await response.json();
    if (!response.ok) return { statusCode:502, body:JSON.stringify({ error:"AI provider request failed." }) };

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) return { statusCode:502, body:JSON.stringify({ error:"No AI response returned." }) };

    return { statusCode:200, headers:{"Content-Type":"application/json"}, body:JSON.stringify({ reply }) };
  } catch (error) {
    console.error(error);
    return { statusCode:500, body:JSON.stringify({ error:"Unexpected server error." }) };
  }
};
