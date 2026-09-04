<p align="center">
  <h1 align="center">🩸 LankaBloodLink</h1>
  <p align="center">
    A MERN-based web platform that connects people who need blood with potential
    blood donors across Sri Lanka, helping simplify donor discovery during urgent
    blood requests.
  </p>
</p>

<br />

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Problem](#-problem)
- [Proposed Solution](#-proposed-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [User Roles](#-user-roles)
- [Core Workflow](#-core-workflow)
- [API Structure](#-api-structure)
- [Technical Highlights](#-technical-highlights)
- [Prerequisites](#-prerequisites)
- [Project Setup](#-project-setup)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [AI-Assisted Development](#-ai-assisted-development)
- [Contributors](#-contributors)
- [Project Links](#-project-links)

---

## 🚀 Introduction

**LankaBloodLink** is a web-based blood donor coordination platform developed
to help people find potential blood donors during urgent situations in Sri Lanka.

The platform allows people to register as blood donors and provides a searchable
donor directory where potential donors can be filtered based on blood group,
district, and availability.

The system also supports blood requests and a matching workflow that identifies
potentially compatible and eligible donors.

LankaBloodLink focuses on a practical Sri Lankan problem by providing a
centralized digital platform instead of relying entirely on manually searching
through social media, messaging groups, and personal contacts.

---

## 🇱🇰 Problem

Finding suitable blood donors during emergencies can be difficult and
time-consuming.

People requiring blood may need to search through:

- Friends and family
- WhatsApp groups
- Social media posts
- Personal contacts
- Existing donor communities

This manual process can delay communication with potential donors, especially
when blood is required urgently.

LankaBloodLink addresses this problem by providing a centralized platform where
donor information can be registered, searched, filtered, and used within a
blood-request and matching workflow.

---

## 💡 Proposed Solution

LankaBloodLink provides a simple web platform connecting:

```text
People who need blood
          ↕
    LankaBloodLink
          ↕
Potential Blood Donors
```

The system allows donors to register their information and allows users to
submit blood requests.

Potential donors can then be identified based on factors such as:

- Blood group
- District
- Availability
- Donor eligibility rules
- Last donation information

The platform is intended to identify **potentially compatible, eligible and
available donors**.

Final donor eligibility and transfusion compatibility must always be confirmed
by qualified healthcare professionals.

---

## ✨ Key Features

| Module | Description |
|---|---|
| **Donor Registration** | Allows users to register as potential blood donors |
| **Donor Directory** | Displays registered potential blood donors |
| **Donor Search** | Search donors by name |
| **Donor Filtering** | Filter donors by blood group, district and availability |
| **Donor Management** | View and update donor information |
| **Blood Requests** | Submit requests for required blood |
| **Request Management** | Manage and track blood request information |
| **Blood Compatibility** | Identifies potentially compatible blood groups |
| **Donor Eligibility** | Applies predefined eligibility rules before matching |
| **Donor Matching** | Identifies potential donors for blood requests |
| **AI-Assisted Ranking** | Ranks safe potential candidates and provides explanations |
| **Notifications** | Supports notifying potential donors about requests |
| **Responsive UI** | Designed for desktop, tablet and mobile screens |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React.js** | Frontend user interface |
| **JavaScript** | Application logic |
| **HTML5** | Web page structure |
| **CSS3** | Styling and responsive design |
| **Node.js** | Backend runtime |
| **Express.js** | REST API and server framework |
| **MongoDB** | Database |
| **Mongoose** | MongoDB object modelling |
| **Git** | Version control |
| **GitHub** | Source code collaboration and repository |
| **ChatGPT** | AI-assisted development |
| **Antigravity** | AI-assisted development |

---

## 🏛️ System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                              │
│                    React.js Application                     │
│                                                             │
│  Home │ Donors │ Blood Requests │ Matching │ Dashboard      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ REST API
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         SERVER                              │
│                    Node.js + Express.js                     │
│                                                             │
│  Donor API │ Request API │ Matching API                     │
│                                                             │
│  Controllers │ Services │ Validation │ Middleware            │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         DATABASE                            │
│                          MongoDB                            │
│                                                             │
│  Donors │ Blood Requests │ Matches                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧠 Smart Matching Architecture

The matching system follows a safety-focused workflow.

```text
┌───────────────────┐
│   Blood Request   │
└─────────┬─────────┘
          │
          ▼
┌──────────────────────────┐
│ Blood Compatibility Rules│
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   Eligibility Rules      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Safe Potential Candidates│
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ AI Ranking & Explanation │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Potential Donor Matches  │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│       Notification       │
└──────────────────────────┘
```

AI is **not used to make final medical eligibility or transfusion decisions**.
Fixed application rules are applied first, and AI is used only as an additional
ranking and explanation layer.

---

## 👥 User Roles

LankaBloodLink supports the following main user interactions:

| User | Main Activities |
|---|---|
| **Potential Donor** | Register donor information, view/update donor details |
| **Blood Requester** | Submit blood requests and view potential donor matches |
| **System** | Process compatibility, eligibility, matching and notifications |

---

## 🔄 Core Workflow

### 1. Become a Donor

```text
User
 ↓
Become a Donor
 ↓
Enter donor information
 ↓
Validate input
 ↓
Save donor
 ↓
Donor added to directory
```

### 2. Find Potential Donors

```text
Blood Request
 ↓
Required Blood Group
 ↓
District / Location
 ↓
Compatibility Rules
 ↓
Eligibility Rules
 ↓
Available Potential Donors
 ↓
Matching / Ranking
```

### 3. Donor Directory

```text
Donor Directory
      │
      ├── Search by Name
      │
      ├── Filter by Blood Group
      │
      ├── Filter by District
      │
      └── Filter by Availability
```

---

## 🔌 API Structure

### Donor API

| Method | Endpoint | Responsibility |
|---|---|---|
| `POST` | `/api/donors` | Create a donor |
| `GET` | `/api/donors` | Retrieve donors |
| `GET` | `/api/donors/:id` | Retrieve a specific donor |
| `PUT` | `/api/donors/:id` | Update donor information |

### Donor Filtering

The donor directory supports filtering using query parameters.

Example:

```text
GET /api/donors?bloodGroup=A%2B
```

```text
GET /api/donors?district=Colombo
```

```text
GET /api/donors?status=Available
```

Multiple filters can be combined when required.

---

## 🧠 Technical Highlights

### Donor Management

The donor management module separates responsibilities into:

```text
React Components
      ↓
donorApi.js
      ↓
REST API
      ↓
Controller
      ↓
Donor Service
      ↓
Donor Model
      ↓
MongoDB
```

This separation keeps UI, API communication, business logic and data access
independent.

### Input Validation

Donor registration validates important fields such as:

- Name
- Blood group
- District
- Phone number
- Last donation date

Meaningful validation messages are provided when invalid information is entered.

### Search & Filtering

The donor directory provides:

- Name search
- Blood group filtering
- District filtering
- Availability filtering

This allows users to quickly narrow down the donor list.

### Responsive Interface

The frontend is designed to provide a usable experience across:

- Desktop
- Laptop
- Tablet
- Mobile

---

## 📦 Prerequisites

Before running the application, install:

- **Node.js**
- **npm**
- **MongoDB / MongoDB Atlas**
- **Git**
- A code editor such as **Visual Studio Code**

---

## ⚙️ Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AhamedhFarajeen/Lanka-Blood-Link.git
```

```bash
cd Lanka-Blood-Link
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
```

### 3. Frontend Setup

Open another terminal and navigate to the client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Application

### Start the Backend

Inside the `server` directory:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Start the Frontend

Inside the `client` directory:

```bash
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

Sensitive information must not be committed to the GitHub repository.

Create a `.env` file for environment-specific configuration.

Example:

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
```

The `.env` file should be excluded from Git using `.gitignore`.

---

## 📁 Project Structure

```text
lanka-blood-link/
│
├── client/
│   ├── public/
│   │   └── images/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ConfirmAction.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── member1-donors/
│   │   │   ├── pages/
│   │   │   │   ├── BecomeDonorPage.jsx
│   │   │   │   └── DonorDirectoryPage.jsx
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── DonorRegistrationForm.jsx
│   │   │   │   ├── DonorCard.jsx
│   │   │   │   ├── DonorList.jsx
│   │   │   │   ├── DonorSearch.jsx
│   │   │   │   └── DonorFilters.jsx
│   │   │   │
│   │   │   └── services/
│   │   │       └── donorApi.js
│   │   │
│   │   ├── member2-requests/
│   │   ├── member3-matching/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── .env.example
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Donor.js
│   │   ├── BloodRequest.js
│   │   └── Match.js
│   ├── controllers/
│   │   ├── donorController.js
│   │   ├── requestController.js
│   │   └── matchingController.js
│   ├── routes/
│   │   ├── donorRoutes.js
│   │   ├── requestRoutes.js
│   │   └── matchingRoutes.js
│   ├── services/
│   │   ├── donorService.js
│   │   ├── requestService.js
│   │   ├── matchingService.js
│   │   ├── rankingService.js
│   │   ├── explanationService.js
│   │   └── notificationService.js
│   ├── utils/
│   │   ├── bloodCompatibility.js
│   │   └── eligibilityRules.js
│   ├── middleware/
│   │   ├── validateRequest.js
│   │   ├── notFoundHandler.js
│   │   └── errorHandler.js
│   ├── data/
│   │   └── sampleData.js
│   ├── tests/
│   │   ├── bloodCompatibility.test.js
│   │   ├── eligibilityRules.test.js
│   │   ├── donorApi.test.js
│   │   └── requestApi.test.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── shared/
│   ├── constants/
│   │   ├── bloodTypes.js
│   │   ├── districts.js
│   │   ├── medicalRules.js
│   │   ├── requestStatuses.js
│   │   └── notificationStatuses.js
│   └── validation/
│       ├── donorSchema.js
│       └── bloodRequestSchema.js
│
├── docs/
│
├── README.md
├── .gitignore
└── package.json
```

---

## 🤖 AI-Assisted Development

AI tools were used as development assistants during the implementation of
LankaBloodLink.

### ChatGPT

Used for:

- Software architecture guidance
- Code generation
- Debugging
- API development guidance
- Validation implementation
- Testing guidance
- Documentation assistance

### Antigravity

Used for:

- React component generation
- Frontend UI development
- Styling
- Code modification
- Debugging
- Feature implementation

AI-generated outputs were reviewed, tested and modified by the team before
being integrated into the project.

---

## 📝 AI Usage Declaration

AI assistance was used during the development of this project.

The team reviewed and tested AI-generated outputs and modified the generated
code where necessary.

All team members are responsible for understanding and explaining the code
submitted as part of the project.

A separate AI Prompt Log records significant AI usage, including:

- AI tool used
- Exact prompt
- Purpose
- How the output was checked
- Modifications made

Sensitive information such as passwords, API keys and personal data is removed
from the prompt log.

---

## 👨‍💻 Contributors

| Member | Student ID | Contribution |
|---|---|---|
| **Member 1** | `YOUR_ID` | Donor Management |
| **Member 2** | `YOUR_ID` | Blood Request Management |
| **Member 3** | `YOUR_ID` | Matching, Compatibility, AI & Notifications |
| **Member 4** | `YOUR_ID` | Shared UI, Integration, Testing & Deployment |

### Member 1 — Donor Management

- Donor model
- Donor REST APIs
- Donor registration
- Donor directory
- Donor search
- Donor filtering
- Donor validation
- Donor update functionality

### Member 2 — Blood Request Management

- Blood request model
- Blood request form
- Request validation
- Request APIs
- Request status management

### Member 3 — Matching & AI

- Blood compatibility logic
- Donor eligibility rules
- Matching engine
- Candidate ranking
- AI-assisted ranking and explanation
- Notification functionality

### Member 4 — Integration & Deployment

- Shared UI components
- Navigation
- Dashboard
- Database configuration
- Integration
- Testing
- Deployment

---

## 🔗 Project Links

### GitHub Repository

https://github.com/AhamedhFarajeen/Lanka-Blood-Link/

### Deployed Application

`YOUR_DEPLOYED_APPLICATION_URL`

### Demonstration Video

`YOUR_2_MINUTE_VIDEO_URL`

---

## 🎯 Project Goal

> **Helping people find potential blood donors faster during urgent situations in Sri Lanka.**

LankaBloodLink provides a centralized platform for donor registration,
donor discovery, blood requests and potential donor matching.

---

## 📚 Academic Information

**SE3090 – Software Engineering Frameworks**

**Assignment 2 – Mini Hackathon**

**Theme:** Build for Sri Lanka

**Year:** 3 | Semester 1 | 2026

---

<p align="center">
  Built for Sri Lanka 🇱🇰 | Powered by Technology & Community 🩸
</p>
