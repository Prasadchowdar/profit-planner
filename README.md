# Profit Planner (AgriLogistics Pro)

A modern web application to help Indian farmers compare crop prices, transport costs, and maximize their profit at agricultural markets.

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Radix-based UI components
- **Supabase** - Backend/database integration
- **Recharts** - Charts library
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create production build |
| `npm run build:dev` | Create development build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── integrations/  # External service integrations
└── main.tsx       # Application entry point
```

## License

MIT
