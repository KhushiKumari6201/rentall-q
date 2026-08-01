# RentAll-Q: Multi-Agent AI-Based Rental Business Management System

RentAll-Q is a full-stack rental business management platform that handles customers, rental units, bookings, payments, and occupancy using **Next.js (App Router, TypeScript)** with **Clean Architecture** principles and **Prisma ORM**, backed by a decoupled **Python AI Agents Microservice (`agents-service`)** for business intelligence (churn prediction, dynamic pricing, occupancy forecasting, payment risk detection, and performance analysis).

---

## 🏗️ Architectural Strategy & Service Decoupling Rationale

```text
+-------------------------------------------------------------------------+
|                              CLIENT (Browser)                           |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                  NEXT.JS APP (Clean Architecture)                       |
|                                                                         |
|  [UI Components & App Router Pages]                                     |
|          |                                                              |
|  [Use Cases / Application Workflows] (CreateBookingUseCase)             |
|          |                                                              |
|  [Domain Entities] (BookingEntity, CustomerEntity, etc.)                |
|          |                                                              |
|  [Repository Contracts] -----> [Prisma Repositories] ------> PostgreSQL |
|          |                                                              |
|  [Agent Service Adapter] ----> [Internal HTTP Client]                   |
+------------------------------------+------------------------------------+
                                     |
                          Internal HTTP Call (/api/v1/agents/{agent}/run)
                                     |
                                     v
+-------------------------------------------------------------------------+
|               PYTHON AGENTS MICROSERVICE (agents-service/)               |
|                                                                         |
|  [Lightweight ASGI API Entrypoint]                                      |
|          |                                                              |
|  [Shared Agent Orchestrator Router]                                     |
|          |                                                              |
|  [Isolated Agent Modules] (churn, pricing, forecasting, risk, perf)     |
|  (Standard interface: run(input_data) -> output_data)                    |
+-------------------------------------------------------------------------+
```

### Why Decouple the Core App and AI Microservice?

1. **Zero ML Dependencies in Core App**: Next.js remains lean and fast. Node.js environment handles UI rendering, Server Actions, Route Handlers, and database persistence through Prisma without bloating Node modules with heavy Python ML frameworks (`scikit-learn`, `pandas`, `PyTorch`).
2. **Independent Scaling & Model Isolation**: The Python `agents-service` handles CPU/GPU-intensive inference and LLM orchestration (via LangChain / LangGraph) independently. High ML workloads will never block Next.js server-side rendering or HTTP route handlers.
3. **Clean Architecture Isolation**: Prisma ORM calls are strictly encapsulated within repository implementations (`src/core/infrastructure/db/repositories/prisma-booking.repository.ts`). Use cases and entities have zero knowledge of Prisma or external HTTP APIs.

---

## 📁 Repository Structure Tree

```text
rentall-q/
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions CI workflow
├── .env.example                       # Root environment variables
├── .gitignore
├── docker-compose.yml                 # Multi-container dev environment
├── README.md                          # Architecture & execution guide
├── nextjs-app/                        # Next.js Full-Stack Application
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── vitest.config.ts               # Vitest configuration
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── prisma/
│   │   └── schema.prisma              # Customer, RentalUnit, Booking, Payment, Occupancy
│   └── src/
│       ├── app/
│       │   ├── layout.tsx             # Root layout with sidebar navigation
│       │   ├── page.tsx               # AI Intelligence & Dashboard page
│       │   ├── globals.css            # Dark slate design system
│       │   ├── bookings/
│       │   │   └── page.tsx           # Bookings management page
│       │   └── api/
│       │       ├── auth/
│       │       │   └── [...nextauth]/route.ts  # NextAuth handler placeholder
│       │       ├── bookings/
│       │       │   └── route.ts       # Clean Architecture API route
│       │       └── agents/
│       │           └── churn/route.ts # Route calling Python agents service
│       ├── core/                      # Clean Architecture Layer
│       │   ├── domain/
│       │   │   ├── entities/
│       │   │   │   ├── booking.entity.ts
│       │   │   │   ├── customer.entity.ts
│       │   │   │   ├── rental-unit.entity.ts
│       │   │   │   ├── payment.entity.ts
│       │   │   │   └── occupancy.entity.ts
│       │   │   └── exceptions/
│       │   │       └── domain.exception.ts
│       │   ├── use-cases/
│       │   │   └── bookings/
│       │   │       ├── create-booking.usecase.ts
│       │   │       └── list-bookings.usecase.ts
│       │   ├── interfaces/
│       │   │   ├── repositories/
│       │   │   │   ├── booking.repository.interface.ts
│       │   │   │   └── base.repository.interface.ts
│       │   │   └── services/
│       │   │       └── agent-service.interface.ts
│       │   └── infrastructure/
│       │       ├── db/
│       │       │   ├── prisma.client.ts
│       │       │   └── repositories/
│       │       │       └── prisma-booking.repository.ts
│       │       └── services/
│       │           └── agents-http.service.ts
│       ├── components/
│       │   ├── ui/                    # Card, Badge
│       │   └── bookings/              # BookingForm, BookingList
│       └── lib/
│           └── auth.ts                # NextAuth options placeholder
└── agents-service/                    # Python AI Agents Microservice
    ├── Dockerfile
    ├── requirements.txt
    ├── pytest.ini                     # Pytest configuration
    ├── .env.example
    ├── tests/
    │   ├── conftest.py
    │   └── test_churn_agent.py
    └── app/
        ├── main.py                    # Uvicorn ASGI server entrypoint
        ├── config.py
        ├── api/
        │   └── routes.py              # Lightweight HTTP route handler
        └── agents/
            ├── base.py                # BaseAgent enforcing run(input) -> output
            ├── orchestrator.py        # Shared AgentOrchestrator router
            ├── churn/                 # ChurnPredictionAgent module
            │   ├── agent.py
            │   └── schema.py
            ├── pricing/               # DynamicPricingAgent module
            ├── forecasting/           # OccupancyForecasterAgent module
            ├── risk/                  # PaymentRiskAgent module
            └── performance/           # PerformanceAnalyzerAgent module
```

---

## 🚀 Running Locally with Docker Compose

1. **Clone & Set Up Environment Variables:**
   ```bash
   cp .env.example .env
   ```

2. **Start the Stack via Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Access Services:**
   - **Next.js Web Application**: [http://localhost:3000](http://localhost:3000)
   - **Python AI Agents Microservice**: [http://localhost:8000](http://localhost:8000)
   - **PostgreSQL Database**: `localhost:5432` (`rentall_db`)
   - **Redis Cache**: `localhost:6379`

4. **Run Database Migrations (inside container or locally):**
   ```bash
   cd nextjs-app
   npx prisma migrate dev --name init
   ```

---

## 🧪 Testing

### 1. Test Next.js Core App (Vitest)
```bash
cd nextjs-app
npm run test
```

### 2. Test Python AI Microservice (Pytest)
```bash
cd agents-service
pytest tests/ -v
```
