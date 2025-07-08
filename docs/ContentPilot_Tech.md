# Technical Specification & Build Plan – ContentPilot (Final)

## 🏗️ Project Scope
Build an AI-first application that enables users to convert any form of consumed content — YouTube videos, PDFs, tweets, voice notes, screenshots, or raw ideas — into personalized, platform-native social media content. The goal is to generate posts that reflect each user's unique voice and style, while maintaining context continuity and reducing friction in content creation and publishing workflows.

---

## ⚙️ Technical Architecture Overview

### 🔧 Frontend
| Component          | Stack/Tool                            | Purpose                                 |
|-------------------|----------------------------------------|-----------------------------------------|
| Framework         | React + Tailwind CSS                   | Responsive UI, clean styling             |
| PWA Support       | React PWA / Service Workers            | Enable mobile-first voice recording      |
| Voice Recorder    | MediaRecorder + Web Speech API         | Record and transcribe voice in-browser   |
| UI Toolkit        | ShadCN/UI, Framer Motion               | Animations, cards, modals                |

---

### 🌐 Backend (API & Services)
| Component       | Tech                                  | Purpose                                |
|-----------------|----------------------------------------|----------------------------------------|
| API Server      | FastAPI (Python)                      | Secure RESTful API                      |
| Auth & DB       | Supabase                              | Auth, Postgres DB, file storage         |
| Caching         | Redis                                 | Rate limits, memory caching            |
| Background Jobs | Celery + Redis                        | Post scheduling, async generation       |
| Storage         | S3-compatible (e.g., Supabase Storage) | Upload voice/audio/PDF/image content    |

---

### 🤖 AI / NLP Engine
| Component              | Stack/Tool                                 | Purpose                                           |
|------------------------|---------------------------------------------|---------------------------------------------------|
| Voice Transcription    | Whisper API                                 | Convert voice to text                             |
| Summarization/RAG      | LangChain + custom chains                   | Insight extraction                                |
| LLMs for Generation    | HuggingFace (Mistral, LLaMA 3, Gemma)       | Style-matching generation                         |
| Reasoning Fallback     | OpenAI GPT-4-turbo, Gemini 1.5              | Long-context or reasoning-heavy output            |
| Signature Style Engine | Fine-tuned prompts + embedding tuning       | Mimic user's tone/voice from past posts           |
| Content Memory         | Vector DB (Weaviate / Pinecone) + Graph DB | Store & connect user's content over time          |

---

### 📥 Ingestion & Processing
| Input Type     | Tooling                                 | Output                         |
|----------------|------------------------------------------|---------------------------------|
| YouTube Link   | youtube-transcript-api + Whisper fallback| Video transcript               |
| PDF            | pdfplumber / PyMuPDF                     | Page-level parsed text         |
| Screenshot     | TrOCR / PaddleOCR                        | OCR text extraction            |
| Tweets/Threads | Custom parser or Twitter embed API       | Clean structured text          |
| Raw Text       | Direct input                             | Tokenized memory node          |
| Voice Notes    | Web recorder + Whisper                   | Transcribed idea chunks        |

---

### 📤 Social Publishing & Workflow
| Feature              | Tech                                | Purpose                                |
|----------------------|-------------------------------------|----------------------------------------|
| Auto-posting         | Twitter API v2, LinkedIn API        | Publish content directly via OAuth     |
| Scheduling           | Celery + Redis                      | Post content at scheduled times        |
| Content Library      | Supabase DB                         | Store past drafts, scheduled posts     |
| Editing Interface    | React Rich Text Editor              | Preview & tweak generated content      |

---

## 🪜 Development Phases

### Phase 1: Core MVP (3 Weeks)
- [ ] Multi-format input: YouTube, PDFs, raw text
- [ ] LangChain pipeline for summarization + post generation
- [ ] Streamlit or lightweight React UI for prototype
- [ ] Manual copy/download for generated content
- [ ] Basic signature style logic (prompt tuning)

### Phase 2: PWA & Voice-to-Post (Weeks 4–6)
- [ ] Voice recording via PWA interface
- [ ] Whisper-based transcription
- [ ] Voice notes → idea → thread/post generation
- [ ] Basic memory graph for past user content
- [ ] Begin supporting platform-specific output formats

### Phase 3: Publishing & Personalization (Weeks 6–8)
- [ ] Auto-posting with OAuth integration
- [ ] Schedule posts using Celery tasks
- [ ] Style learning via user-uploaded past posts
- [ ] Launch Pro Tier & API access for power users

---

## 🧱 Suggested Folder Structure

```
contentpilot/
├── backend/
│   ├── api/                 # FastAPI endpoints
│   ├── services/            # Logic: summarization, generation, style
│   ├── ingestion/           # YouTube, PDFs, OCR, etc.
│   ├── memory/              # Vector/graph embeddings
│   └── tasks/               # Celery jobs
├── frontend/
│   ├── components/          # React UI blocks
│   ├── pages/
│   └── utils/
├── llm/
│   ├── prompts/             # Signature prompt templates
│   ├── chains/              # LangChain logic
│   └── embeddings/          # Custom tuning assets
├── storage/
│   └── uploads/             # Voice, PDFs, screenshots
└── requirements.txt
```

---

## ✅ Key Deliverables & KPIs

| Milestone               | Target Outcome                              |
|-------------------------|----------------------------------------------|
| MVP Launch              | 3+ input types, post generation works        |
| Voice-to-Post Enabled   | Users can post from voice recordings         |
| Signature Style Live    | Personalized generation per user            |
| Memory System Working   | AI can reference prior learnings            |
| Auto-publish + Schedule | OAuth + task queue deployed                 |
| Paid Tier Onboarded     | Subscription logic + Stripe/Razorpay live   |

---
