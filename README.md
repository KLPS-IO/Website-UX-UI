# KLPS Platform – Website UX/UI

Core frontend and backend platform for KLPS wearable data ingestion and visualisation.

This system includes:

- React + Vite frontend
- Express API backend
- PostgreSQL database
- API key authentication
- Rate limiting
- Health monitoring
- Automated database backups
- Structured request logging
- TypeScript server architecture

---

# System Architecture

Frontend:
React + Vite

Backend:
Express API

Database:
PostgreSQL 16

Security:
- API Key protection
- Input validation (Zod)
- Rate limiting
- Role-based database access

Observability:
- Health endpoint (`/health`)
- Morgan request logging

Backup:
- Automated PostgreSQL dumps
- Cron scheduled nightly backup

---

# Running the Project

Install dependencies:

npm install

Start development environment:

npm run full

This starts:

- Frontend (Vite)
- Backend (Express API)

---

# Health Check

Verify system status:

curl http://localhost:3001/health

Expected:

{
  "status": "ok",
  "database": "connected"
}

---

# Local Development Setup (Mac)

## Install Homebrew

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Verify:

brew --version

---

## Install Node.js

brew install node

Verify:

node -v
npm -v

---

## Install PostgreSQL

brew install postgresql@16

Start:

brew services start postgresql@16

---

## Create Database

createdb klps_db

Connect:

psql klps_db

---

## Create Table

CREATE TABLE waist_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    waist_value DECIMAL(5,2),
    source TEXT DEFAULT 'wearable',
    created_at TIMESTAMP DEFAULT NOW()
);

---

# Environment Variables

Create:

.env

Example:

DATABASE_URL=postgresql://klps_app:yourpassword@localhost:5432/klps_db
API_KEY=yourStrongKey
NODE_ENV=development
PORT=3001

---

# Logging

Request logging is enabled using:

morgan

Logs include:

- Route
- Status
- Response time
- IP address

---

# Backups

Automated nightly backups run using:

cron

Schedule:

02:00 daily

Script:

backup.sh

Backups stored in:

backups/

---

# Security Controls

Implemented:

- API Key validation
- Rate limiting
- Input validation
- Database role isolation

---

# Future Components

Planned:

- KLPS LEMA (AI intelligence system)
- Analytics pipeline
- Visual inference engine
- Model training architecture