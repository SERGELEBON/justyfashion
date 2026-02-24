# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a fashion website for "CoutureJF" built with React 19, TypeScript, Vite, and Tailwind CSS. It features a modern dark/light theme system and uses shadcn/ui components extensively.

## Development Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compilation first)
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview production build locally

## Architecture

### Routing Structure
The app uses React Router v7 with a nested layout structure:
- `/` - Home page
- `/collections` - Fashion collections
- `/lookbook` - Style lookbook
- `/atelier` - Atelier/workshop information
- `/contact` - Contact page

All routes are wrapped in the `Layout` component which provides `Header` and `Footer`.

### Key Technologies & Libraries
- **UI Components**: shadcn/ui with 40+ pre-configured components
- **Styling**: Tailwind CSS v3.4.19 with custom theme configuration
- **Animations**: GSAP v3.14.2 for advanced animations
- **Theme System**: Custom dark/light mode with localStorage persistence
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization

### Project Structure
```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── Header.tsx    # Navigation header
│   ├── Footer.tsx    # Site footer
│   └── Layout.tsx    # Main layout wrapper
├── contexts/         # React contexts
│   └── ThemeContext.tsx  # Dark/light theme management
├── hooks/            # Custom React hooks
├── pages/            # Route components (Home, Collections, etc.)
├── lib/              # Utility functions
└── types/            # TypeScript type definitions
```

### Theme System
The app implements a sophisticated theme system via `ThemeContext`:
- Automatic system preference detection
- localStorage persistence
- CSS class-based theme switching (`dark` class on document root)
- Available themes: `light`, `dark`

### Component System
Uses shadcn/ui components configured with:
- New York style variant
- Slate base color
- CSS variables for theming
- Lucide icons
- Path aliases: `@/components`, `@/lib/utils`, etc.

### Build Configuration
- **Vite**: Modern build tool with React plugin
- **Base path**: `./` for relative asset loading
- **Aliases**: `@` points to `./src`
- **ESLint**: Configured for TypeScript, React hooks, and React refresh
- **PostCSS**: Configured for Tailwind CSS processing

### Development Notes
- Uses `kimi-plugin-inspect-react` for React component inspection
- TypeScript strict mode enabled
- Path-based imports with `@/` prefix
- Grain overlay effect applied globally via CSS