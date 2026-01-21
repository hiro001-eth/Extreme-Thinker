# Transaction Synth - Synthetic Data Generator

## Overview

Transaction Synth is a synthetic financial transaction data generator designed for AI/ML model training purposes. The application generates realistic-looking e-wallet transaction screenshots in bulk, with configurable parameters for amounts, dates, times, and transaction remarks. The primary use case is creating training data to help financial fraud detection models identify fake payment screenshots.

The system generates 300+ transaction images that simulate mobile payment app screenshots, with randomized but controlled transaction amounts ($5-$15 per transaction), dates spanning January 1-19, and Gen-Z style transaction remarks (shopping, food, etc.). The total across all transactions is constrained to $3,100-$3,500.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom cyberpunk/dark theme
- **Image Generation**: html2canvas for converting React components to images
- **File Handling**: file-saver for downloading generated images

The frontend is a single-page application with one main Generator page that displays a control panel for starting image generation, shows progress, and provides preview/download functionality for generated transaction screenshots.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Build Tool**: esbuild for server bundling, Vite for client
- **API Pattern**: RESTful endpoints under `/api/` prefix

The backend provides simple CRUD endpoints for transaction persistence and serves the static frontend in production.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Current Storage**: In-memory storage (`MemStorage` class) with interface ready for database migration
- **Tables**: Users table, Transactions table (stores amount, remarks, date, time, imageUrl)

The storage layer uses an interface pattern (`IStorage`) allowing easy swap between in-memory and database-backed implementations.

### Image Generation Pipeline
1. Transaction data is generated client-side using controlled randomization algorithms
2. React `Receipt` component renders mobile-style payment screenshots
3. html2canvas captures the DOM element as an image
4. Images are processed in batches with progress tracking
5. Generated images can be downloaded individually or as a batch

### Key Design Decisions

**Client-side image generation**: Chosen to reduce server load and enable real-time preview. The Receipt component mimics a mobile payment app UI with proper dimensions (360x740px for mobile aspect ratio).

**Controlled randomization**: Transaction amounts, dates, and remarks follow specific distribution rules to create realistic-looking data while meeting total constraints.

**Monorepo structure**: Client (`client/`), server (`server/`), and shared code (`shared/`) in one repository with path aliases for clean imports.

## External Dependencies

### Database
- **PostgreSQL**: Required for production persistence
- **Environment Variable**: `DATABASE_URL` must be set for database connections
- **Migration Tool**: drizzle-kit for schema migrations (`npm run db:push`)

### Third-Party Libraries
- **html2canvas**: Client-side screenshot/image generation from DOM elements
- **file-saver**: Browser-based file download functionality
- **date-fns**: Date manipulation and formatting
- **Radix UI**: Accessible component primitives (dialogs, tooltips, forms, etc.)
- **TanStack Query**: Async state management and caching

### Development Tools
- **Vite**: Development server with HMR and production builds
- **Replit Plugins**: Dev banner, cartographer, runtime error overlay (development only)
- **tsx**: TypeScript execution for Node.js

### Fonts
- **Google Fonts**: Inter (UI text), Roboto (Android-style elements), Fira Code (monospace/terminal aesthetic)