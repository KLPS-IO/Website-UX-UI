
  # Mobile App Wireframe

  This is a code bundle for Mobile App Wireframe.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Local Development Setup (Mac)

This project uses:

- Node.js
- PostgreSQL
- TypeScript
- React
- Arduino Serial Integration

Follow these steps exactly on a new machine.

---

## 1. Install Homebrew

Homebrew is required to install PostgreSQL.

Run:

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

After installation, verify:

brew --version

You should see a version number.

---

## 2. Install Node.js (if not installed)

brew install node

Verify:

node -v
npm -v

---

## 3. Install PostgreSQL

brew install postgresql@16

Start PostgreSQL:

brew services start postgresql@16

Verify PostgreSQL is running:

psql postgres

You should see:

postgres=#

To exit:

\q

---

## 4. Create KLPS Database

Run:

createdb klps_db

Then open database:

psql klps_db

---

## 5. Create Waist Measurement Table

Inside psql:

CREATE TABLE waist_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    waist_value DECIMAL(5,2),

    source TEXT DEFAULT 'wearable',

    created_at TIMESTAMP DEFAULT NOW()
);

Exit:

\q

---

## 6. Install Required Node Packages

Inside project root:

npm install express pg cors dotenv

For TypeScript:

npm install -D typescript ts-node @types/node @types/express

---

## 7. Create .env File

Create:

.env

Add:

DATABASE_URL=postgresql://localhost:5432/klps_db
PORT=3001
DB_USER=emmamendez
DB_HOST=localhost
DB_NAME=klps_db
DB_PASSWORD=
DB_PORT=5432

---

## 8. Run Local API

Later:

npm run dev