# ContentPilot Project Structure Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Development Guidelines](#development-guidelines)
4. [Package Organization](#package-organization)
5. [Best Practices](#best-practices)
6. [Getting Started](#getting-started)

## Directory Graph
```
contentpilot-monorepo/
├── .github/                        # CI/CD Configuration
│   └── workflows/
│       ├── ci.yml                 # Continuous Integration pipeline
│       └── cd.yml                 # Continuous Deployment pipeline
│
├── .husky/                        # Git hooks for code quality
│
├── apps/                          # 📦 DEPLOYABLE APPLICATIONS
│   ├── web/                       # Next.js Frontend (PWA)
│   │   ├── app/                   # Next.js App Router (pages, layouts)
│   │   ├── components/            # UI components (buttons, cards, forms)
│   │   ├── hooks/                 # Custom React hooks (e.g., useVoiceRecorder)
│   │   ├── workers/               # PWA service worker for offline support
│   │   ├── lib/                   # Helper functions, API client
│   │   ├── public/                # Static assets (images, fonts)
│   │   ├── README.md             # Documentation for the web app
│   │   └── package.json
│   │
│   ├── api-gateway/               # FastAPI Backend (Synchronous API)
│   │   ├── src/
│   │   │   ├── main.py           # FastAPI app instance and middleware
│   │   │   ├── config.py         # Environment variables and settings
│   │   │   └── domains/          # Core business logic by domain
│   │   │       ├── auth/         # User authentication and sessions
│   │   │       ├── billing/      # Monetization: Stripe/Razorpay logic
│   │   │       ├── content/      # CRUD for drafts and content library
│   │   │       ├── ingestion/    # Endpoints to trigger ingestion jobs
│   │   │       ├── publishing/   # Endpoints to trigger publishing/scheduling
│   │   │       └── analytics/    # Endpoints for tracking KPIs
│   │   ├── README.md            # API documentation
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── workers/                   # Asynchronous Celery Workers
│       ├── src/
│       │   ├── main.py           # Celery app instance and configuration
│       │   └── tasks/            # All asynchronous background tasks
│       │       ├── run_ingestion.py  # Content ingestion tasks
│       │       ├── run_ai_core.py    # AI processing tasks
│       │       └── run_publishing.py  # Social media publishing tasks
│       ├── README.md             # Worker documentation
│       ├── Dockerfile
│       └── requirements.txt
│
├── docs/                          # 📖 CENTRAL PROJECT DOCUMENTATION
│   ├── architecture.md            # System architecture overview
│   ├── branching_strategy.md      # Git workflow guide
│   ├── deployment.md              # Deployment instructions
│   └── contributing.md            # Contribution guidelines
│
├── e2e/                           # End-to-End tests
│   └── tests/
│       └── auth.spec.ts           # Authentication flow tests
│
├── infra/                         # ☁️ INFRASTRUCTURE AS CODE
│   ├── README.md                  # Infrastructure documentation
│   ├── docker-compose.yml         # Local development environment
│   └── terraform/                 # Cloud infrastructure
│
├── packages/                      # 📚 SHARED LIBRARIES & CODE
│   ├── core-ai/                   # 🔥 THE AI BRAIN (Core IP)
│   │   ├── chains/               # LangChain definitions
│   │   ├── ingestion/            # Content processing logic
│   │   ├── publishing/           # Platform-specific generation
│   │   ├── prompts/              # AI prompt templates
│   │   ├── memory/               # Content Memory System
│   │   │   ├── graph_db.py      # Narrative continuity
│   │   │   ├── style_memory.py  # User voice/style
│   │   │   └── vector_store.py  # RAG and search
│   │   ├── cache/               # Performance optimization
│   │   │   ├── rate_limits.py
│   │   │   └── memory_cache.py
│   │   ├── errors/              # Error handling
│   │   │   ├── fallback.py
│   │   │   └── retry.py
│   │   └── README.md            # AI engine documentation
│   │
│   ├── db/                       # Database schema and client
│   │   ├── models/              # Database models
│   │   ├── migrations/          # Schema migrations
│   │   └── repositories/        # Data access logic
│   │
│   ├── ui/                       # Shared React components
│   │   ├── components/          # Design system components
│   │   ├── .storybook/          # Component documentation
│   │   └── README.md            # UI library guide
│   │
│   ├── eslint-config-custom/     # Shared ESLint rules
│   └── tsconfig/                 # Shared TypeScript config
│
├── .gitignore                     # Git ignore patterns
├── .prettierrc                    # Code formatting rules
├── package.json                   # Root monorepo config
├── pnpm-workspace.yaml            # PNPM workspace config
└── README.md                      # Project overview 

## Overview

ContentPilot is organized as a monorepo using modern development practices:
- **Domain-Driven Design (DDD)** for business logic organization
- **Microservices-Ready Architecture** for scalability
- **Shared Package Strategy** for code reuse
- **Infrastructure as Code** for deployment consistency

## Directory Structure

### 📦 `apps/` - Deployable Applications

#### `web/` - Next.js Frontend (PWA)
```
web/
├── app/                 # Next.js 13+ App Router
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── workers/            # PWA service workers
├── lib/                # Utility functions
└── public/             # Static assets
```
**When to use**: For all user interface related code and PWA features

#### `api-gateway/` - FastAPI Backend
```
api-gateway/
├── src/
│   ├── domains/        # Business logic by domain
│   │   ├── auth/      # Authentication & authorization
│   │   ├── billing/   # Payment & subscription
│   │   ├── content/   # Content management
│   │   ├── ingestion/ # Content ingestion
│   │   └── publishing/# Content publishing
│   ├── main.py        # Application entry
│   └── config.py      # Configuration
```
**When to use**: For HTTP endpoints and immediate responses

#### `workers/` - Celery Workers
```
workers/
├── src/
│   └── tasks/         # Background tasks
│       ├── run_ingestion.py
│       ├── run_ai_core.py
│       └── run_publishing.py
```
**When to use**: For long-running processes and scheduled tasks

### 📚 `packages/` - Shared Libraries

#### `core-ai/` - AI Engine (Core IP)
```
core-ai/
├── chains/            # LangChain definitions
├── ingestion/         # Content processing
├── publishing/        # Platform publishing
├── prompts/           # AI prompts
├── memory/           # Content memory system
│   ├── graph_db.py   # Narrative continuity
│   ├── style_memory.py # User style
│   └── vector_store.py # RAG system
├── cache/            # Performance optimization
└── errors/           # Error handling
```
**When to use**: For AI/ML features and content processing

#### `db/` - Database Layer
```
db/
├── models/           # Database models
├── migrations/       # Schema migrations
└── repositories/    # Data access logic
```
**When to use**: For database operations and schema management

#### `ui/` - Shared Components
```
ui/
├── components/      # Reusable React components
└── .storybook/     # Component documentation
```
**When to use**: For shared UI components and design system

### 🛠️ Supporting Directories

#### `.github/` - CI/CD Configuration
```
.github/
└── workflows/
    ├── ci.yml      # Continuous Integration
    └── cd.yml      # Continuous Deployment
```

#### `docs/` - Documentation
```
docs/
├── architecture.md
├── deployment.md
└── contributing.md
```

#### `infra/` - Infrastructure
```
infra/
├── docker-compose.yml
└── terraform/
```

## Development Guidelines

### 1. Code Organization
- Keep related code together (Domain cohesion)
- Use clear, descriptive names
- Follow the established pattern in each directory

### 2. Adding New Features
1. **Frontend Features**
   - Add components in `apps/web/components/`
   - Add hooks in `apps/web/hooks/`
   - Add pages in `apps/web/app/`

2. **Backend Features**
   - Add endpoints in appropriate domain
   - Add worker tasks for async operations
   - Update database schema as needed

3. **AI Features**
   - Add new AI logic in `packages/core-ai/`
   - Update prompts in `prompts/`
   - Add new memory features in `memory/`

### 3. Testing Strategy
- Unit tests alongside code
- Integration tests in `e2e/`
- Component tests in Storybook

## Package Organization

### Python Package Structure
- Use `__init__.py` in all directories
- Follow domain-driven structure
- Use relative imports

### JavaScript/TypeScript Structure
- Use TypeScript for all new code
- Share configs via `tsconfig/`
- Follow ESLint rules

## Best Practices

### 1. Code Quality
- Write tests for new features
- Document complex logic
- Follow style guides

### 2. Performance
- Use caching appropriately
- Optimize API calls
- Follow PWA best practices

### 3. Security
- Never commit secrets
- Validate all inputs
- Follow security best practices

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd contentpilot
   ```

2. **Install Dependencies**
   ```bash
   # Install pnpm (if not installed)
   npm install -g pnpm

   # Install dependencies
   pnpm install
   ```

3. **Set Up Development Environment**
   ```bash
   # Copy environment variables
   cp .env.example .env

   # Start development servers
   pnpm dev
   ```

4. **Running Tests**
   ```bash
   # Unit tests
   pnpm test

   # E2E tests
   pnpm test:e2e
   ``` 