# 🧠 SummarizeIt — AI Research Assistant Chrome Extension

![Java](https://img.shields.io/badge/Java-17+-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-Backend-brightgreen)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue)
![AI](https://img.shields.io/badge/AI-Groq%20LLM-purple)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

An **AI-powered Chrome extension** that helps users summarize webpages, articles, and selected text instantly.

The extension extracts content from webpages and sends it to a **Spring Boot backend**, which processes the request using **Groq LLM models**.

---

# ✨ Features

### ⚡ Instant Text Summarization

Highlight any text on a webpage and summarize it instantly.

### 📄 Full Page Summarization

Automatically extract and summarize article content.

### 🧠 AI Powered

Uses Groq's LLaMA models for fast AI inference.

### 📝 Smart Notes

Save notes per webpage using Chrome local storage.

### 🧩 Floating Summarize Button

Appears when text is highlighted (similar to ChatGPT extensions).

### 🖥 Modern Side Panel UI

Clean UI for summarizing and managing notes.

---

# 🏗 System Architecture

![Architecture](assets/architecture.png)

Flow:

User → Chrome Extension → Spring Boot API → Groq AI → Response → Extension

---


# 🖼 Screenshots

### Floating Summarize Button

![Floating Button](assets\floatingButton.png)

### Side Panel Interface

![Side Panel](assets\SummarizeItUI.png)

### AI Generated Summary

![Summary](assets\floatingButtonWithSummary.png)

### Summary Of A Whole Page

![PageSummary](assets\SummarizeWholePage.png)

---

# ⚙ Tech Stack

### Frontend

* Chrome Extension (Manifest V3)
* JavaScript
* HTML
* CSS

### Backend

* Java
* Spring Boot
* WebClient
* REST APIs

### AI Integration

* Groq API
* LLaMA Models

---

# 📂 Project Structure

```
AI-Research-Assistant
│
├── chrome-extension
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── sidepanel.html
│   ├── sidepanel.js
│   ├── sidepanel.css
│   └── icons
│
├── assets
│   ├── floatingButton.png
│   ├── floatingButtonWithSummary.png
│   ├── SummarizeItUI.png
│   └── SumarizeWholePage.png
│
└── README.md
│
├── backend
│   │
│   assistant
│   │
│   ├── src/main/java/com/research/assistant
│        │
│        ├── config
│        │   └── WebClientConfig
│        │
│        ├── controller
│        │   └── ResearchController
│        │
│        ├── dto
│        │   └── ApiResponse
│        │   └── ResearchRequest
│        │
│        ├── exception
│        │   └── GlobalExceptionHandler
│        │
│        ├── response
│        │   └── GroqResponse
│        │
│        ├── service
│        │   └── RateLimiterService
│        │   └──ResearchService
│        │
│        └── AssistantApplication.java
│            └── Spring Boot entry point
│
└── src/main/resources
    ├── static
    ├── templates
    └── application.properties

```

---

# 🚀 Setup Guide

## 1 Clone Repository

```
git clone https://github.com/yourusername/summarizeit
```

---

## 2 Run Backend

```
cd backend
mvn spring-boot:run
```

Server will start on

```
http://localhost:8080
```

---

## 3 Install Chrome Extension

Open:

```
chrome://extensions
```

Enable **Developer Mode**

Click **Load Unpacked**

Select:

```
chrome-extension/
```

---

# 🔌 API Endpoint

```
POST /api/research/process
```

Example Request

```
{
  "content": "Text to summarize",
  "operation": "summarize"
}
```

---

# 📈 Future Improvements

• Deploy backend to cloud
• Multi-mode AI assistant (Explain / Key Points)
• Export summaries to PDF
• Summary history
• Multi-language support

---

# 👨‍💻 Author

**Kaustubh Mali**

Java Developer | Full Stack Developer | AI Tools Builder
