# Aditya Kumar — Personal AI Agent

## Purpose

A standalone AI assistant added to the existing portfolio without modifying the existing portfolio files.

## Features

- Answers questions about Aditya
- Explains projects and technologies
- Handles recruiter-style questions
- Provides portfolio/contact information
- Uses a grounded profile prompt
- Keeps the Groq API key server-side
- Works with Netlify Functions

## Architecture

Browser → `/.netlify/functions/chat` → Groq API → grounded Aditya profile → response

## Setup

Add this environment variable in Netlify:

`GROQ_API_KEY=your_groq_api_key`

Do not put the key in `app.js`, HTML, or any committed file.

## URL

After deployment, open:

`https://your-domain.netlify.app/ai-agent/`

## Verification

- [ ] Portfolio homepage still works
- [ ] `/ai-agent/` opens
- [ ] Suggested questions work
- [ ] Free-text questions work
- [ ] API key is not exposed in frontend files
- [ ] Unknown information is not fabricated
- [ ] Mobile layout works
