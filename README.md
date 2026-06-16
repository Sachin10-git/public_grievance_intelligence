# Smart Public Grievance Intelligence Platform

A full-stack AI-powered Public Grievance Management System designed to streamline citizen complaint reporting, automate grievance analysis, assist administrative decision-making, and improve issue resolution workflows through Generative AI, Retrieval-Augmented Generation (RAG), and intelligent analytics.

The platform enables citizens to submit grievances with supporting evidence, while providing administrators with AI-assisted tools for complaint categorization, prioritization, escalation management, knowledge retrieval, and conversational analysis.

---

## Overview

Public grievance systems often suffer from manual categorization, delayed response times, inefficient routing, and limited administrative insights.

This project addresses these challenges by integrating Artificial Intelligence into the grievance lifecycle. Complaints are automatically analyzed, categorized, prioritized, assigned to appropriate departments, and stored for intelligent retrieval. Administrators can interact with an AI Assistant capable of answering questions about complaint trends, workloads, priorities, and unresolved cases using Retrieval-Augmented Generation (RAG).

---

## Key Features

### Citizen Portal

* User Registration and Authentication
* Secure Login using JWT Authentication
* Complaint Submission with Location Information
* Image Upload Support for Evidence
* Unique Ticket ID Generation
* Complaint Status Tracking
* Email Notification upon Complaint Registration

### AI Complaint Analysis

* Automatic Complaint Categorization
* Automatic Priority Prediction
* Department Recommendation
* AI-Generated Complaint Summary
* Knowledge Base Assisted Classification
* Intelligent Recommendation Generation

### Retrieval-Augmented Generation (RAG)

* Complaint Embedding Generation
* Vector Similarity Search
* Context-Aware Complaint Retrieval
* Semantic Search Across Complaints
* Knowledge Base Retrieval
* AI-Powered Complaint Understanding

### AI Administrative Assistant

* Conversational Administrative Interface
* Complaint Trend Analysis
* Department Workload Queries
* Resolution Rate Analysis
* Pending and Unresolved Complaint Analysis
* Complaint Category Insights
* Context-Aware Responses using Retrieved Complaint Data

### Knowledge Base System

* Domain-Specific Government Issue Repository
* Semantic Knowledge Retrieval
* Similar Issue Identification
* Automated Department Mapping
* Recommended Action Suggestions

### Escalation Management

* Automatic Escalation Detection
* Escalation Tracking
* Escalation Reason Logging
* Administrative Monitoring

### Chat History Management

* Persistent Conversation Storage
* Session-Based Chat History
* Historical Conversation Review
* Administrative Audit Trail

---

## System Architecture

Citizen Complaint Submission

↓

AI Analysis Engine

↓

Knowledge Base Retrieval

↓

Embedding Generation

↓

Vector Search

↓

Complaint Storage

↓

Administrative Dashboard

↓

AI Assistant (RAG Powered)

---

## AI Pipeline

### Complaint Analysis Workflow

1. Citizen submits complaint.
2. Complaint title and description are processed.
3. Semantic embeddings are generated.
4. Knowledge Base similarity search is performed.
5. Matching issue patterns are identified.
6. Category, Priority, Department, and Recommended Actions are assigned.
7. Complaint is stored in MongoDB.
8. Administrative notifications and workflows are triggered.

---

### AI Assistant Workflow

1. Administrator submits a query.
2. Query embeddings are generated.
3. Relevant complaints are retrieved using vector search.
4. Retrieved complaints are used as context.
5. Groq LLM generates a context-aware response.
6. Response is displayed and stored in chat history.

---

## Technology Stack

### Frontend

* React.js
* React Router
* CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Artificial Intelligence

* Google Gemini API
* Groq API
* Embedding-Based Retrieval
* Retrieval-Augmented Generation (RAG)

### Authentication & Security

* JWT Authentication
* Protected Routes
* Role-Based Access

### Storage

* Multer
* Local File Storage

### Notifications

* Nodemailer

---

## Database Models

### User

* Name
* Email
* Password
* Role

### Complaint

* Title
* Description
* Location
* Image
* Ticket ID
* Category
* Priority
* Department
* AI Summary
* Recommended Action
* Status
* Embedding
* Escalation Information

### Knowledge Base

* Title
* Description
* Category
* Department
* Priority
* Recommended Action
* Embedding

### Chat History

* Messages
* Session Timestamp

---

## Project Structure

```text
client/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── routes/
│   └── styles/

server/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── scripts/
├── uploads/
└── data/
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd Public-Grievance-Platform
```

### Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

GROQ_API_KEY=your_groq_api_key

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

Start Backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd client

npm install
```

Start Frontend:

```bash
npm run dev
```

---

## API Modules

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Complaints

```http
POST /api/complaints
GET /api/complaints
PUT /api/complaints/:id
```

### AI Assistant

```http
POST /api/assistant
```

### Knowledge Base

```http
POST /api/kb/search
```

### Chat History

```http
POST /api/chat-history/save
GET /api/chat-history/all
```

### Vector Search

```http
POST /api/vector/search
```

---

## Future Enhancements

* Geospatial Complaint Mapping
* Smart City Analytics Dashboard
* Multi-Language Complaint Submission
* Voice-Based Complaint Registration
* Department Performance Metrics
* Automated Resolution Suggestions
* AI-Generated Weekly Administrative Reports
* Real-Time Monitoring and Alerting

---

## Learning Outcomes

This project demonstrates practical implementation of:

* Full Stack Web Development
* Generative AI Integration
* Retrieval-Augmented Generation (RAG)
* Semantic Search
* Vector Embeddings
* Prompt Engineering
* REST API Development
* Authentication and Authorization
* Database Design
* AI-Powered Decision Support Systems

---

## Author

**Sachin S**

Information Science and Engineering
BMS Institute of Technology and Management

GitHub: https://github.com/<your-github-username>

---

## License

This project is intended for educational, research, and demonstration purposes.
