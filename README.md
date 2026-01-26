

## Overview

**Transaction Synth** is a synthetic financial transaction data generator built for **AI/ML model training**.

It creates **realistic-looking e-wallet transaction screenshots in bulk**, mainly to help train **fraud detection models** that need to identify **fake or manipulated payment screenshots**.

The app can generate **300+ mobile-style transaction images** with controlled randomness:

- Small transaction amounts ($5–$15)
    
- Dates between **January 1 – January 19**
    
- Realistic Gen-Z style remarks (shopping, food, subscriptions, etc.)
    
- Total transaction value constrained between **$3,100 – $3,500**
    

The output looks like genuine mobile payment app screenshots, suitable for dataset creation, testing, and research.

---

## Key Features

- Generate **300+ synthetic transaction screenshots**
    
- Mobile app–style UI (360 × 740px)
    
- Controlled randomness (realistic but predictable limits)
    
- Client-side image generation (fast + previewable)
    
- Batch download support
    
- Designed for **fraud detection & AI training**, not real payments
    

---

## Use Case

This project is intended for:

- Training **fraud detection models**
    
- Detecting **fake payment screenshots**
    
- AI/ML dataset generation
    
- Research and testing financial systems
    
- Educational and defensive security use
    

> ⚠️ This tool is for **synthetic data generation only**.  
> It does **not** connect to real payment systems.

---

## System Architecture

### Frontend

- **Framework:** React 18 + TypeScript
    
- **Routing:** Wouter
    
- **State Management:** TanStack React Query
    
- **UI Components:** shadcn/ui (Radix UI based)
    
- **Styling:** Tailwind CSS v4 (dark / cyberpunk theme)
    
- **Image Generation:** `html2canvas`
    
- **File Download:** `file-saver`
    

The frontend is a **single-page app** with:

- Generator control panel
    
- Live progress tracking
    
- Preview of generated screenshots
    
- Individual and batch download support
    

---

### Backend

- **Runtime:** Node.js
    
- **Framework:** Express.js
    
- **Language:** TypeScript (ESM)
    
- **API Style:** REST (`/api/*`)
    
- **Build Tools:**
    
    - `esbuild` (server)
        
    - `vite` (client)
        

The backend:

- Provides CRUD APIs for transactions
    
- Handles persistence
    
- Serves the frontend in production
    

---

## Data Storage

- **ORM:** Drizzle ORM (PostgreSQL dialect)
    
- **Schema:** `shared/schema.ts`
    
- **Current Storage:** In-memory (`MemStorage`)
    
- **Future Ready:** Easy switch to PostgreSQL
    

### Tables

- **Users**
    
- **Transactions**
    
    - amount
        
    - remarks
        
    - date
        
    - time
        
    - imageUrl
        

The storage layer uses an **interface-based design** (`IStorage`) so databases can be swapped without changing app logic.

---

## Image Generation Pipeline

1. Transaction data is generated **client-side**
    
2. A React **Receipt component** renders a mobile-style UI
    
3. `html2canvas` captures the DOM as an image
    
4. Images are generated in batches
    
5. Progress is shown in real time
    
6. Images can be downloaded individually or in bulk
    

---

## Key Design Decisions

### Client-Side Image Generation

- Reduces server load
    
- Allows live previews
    
- Faster iteration and debugging
    

### Controlled Randomization

- Amounts: $5–$15
    
- Dates: Jan 1–19
    
- Total sum capped ($3,100–$3,500)
    
- Realistic human-like patterns
    

### Monorepo Structure

`/ ├── client/    # React frontend ├── server/    # Express backend ├── shared/    # Shared schema & types`

This keeps frontend, backend, and shared logic clean and consistent.

---

## External Dependencies

### Database

- **PostgreSQL** (required for production)
    
- Environment variable:
    
    `DATABASE_URL=postgresql://user:pass@host:port/db`
    

### Migration

- **drizzle-kit**
    

`npm run db:push`

---

## Major Libraries Used

- `html2canvas` – DOM → image rendering
    
- `file-saver` – browser downloads
    
- `date-fns` – date handling
    
- `@tanstack/react-query` – async state management
    
- `radix-ui` – accessible UI primitives
    
- `drizzle-orm` – database ORM
    

---

## Development Tools

- **Vite** – dev server & build
    
- **tsx** – TypeScript execution for Node
    
- **esbuild** – fast backend bundling
    
- **Replit plugins** (dev-only helpers)
    

---

## Fonts Used

- **Inter** – UI text
    
- **Roboto** – Android-style elements
    
- **Fira Code** – monospace / terminal look
    

---

## Disclaimer

This project generates **synthetic and fictional data only**.

It does **not**:

- Connect to real payment systems
    
- Process real money
    
- Generate real transaction proofs
    

Use it **only for testing, training, and research purposes**.
