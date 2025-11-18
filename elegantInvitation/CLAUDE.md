# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite project for an elegant wedding invitation application. It's a minimal setup with modern tooling for fast development and building.

## Common Commands

### Development
- `npm run dev` - Start the development server with HMR (Hot Module Replacement)
- `npm run preview` - Preview the production build locally

### Build & Deployment
- `npm run build` - Build the project (runs TypeScript check followed by Vite build)

### Code Quality
- `npm run lint` - Run ESLint on the codebase

## Project Structure

- **src/** - Source code directory
  - `main.tsx` - Entry point that mounts the React app to the DOM
  - `App.tsx` - Root React component
  - `App.css` - Styles for the App component
  - `index.css` - Global styles
  - `assets/` - Static assets (SVGs, images, etc.)
- **public/** - Public static assets served from the root
- **index.html** - HTML template for the app

## Technology Stack

- **React 19.2** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool with fast HMR
- **ESLint** - Code linting with React hooks and refresh rules

## TypeScript Configuration

The project uses strict TypeScript settings (`src/tsconfig.app.json`):
- Target: ES2022
- Strict mode enabled
- JSX: react-jsx (automatic JSX transform)
- Unused locals/parameters are errors
- No unchecked side effect imports allowed

This means all imports with side effects must be explicitly marked or justified.

## ESLint Configuration

The project uses the flat config format with:
- TypeScript ESLint rules
- React Hooks plugin for hook rules
- React Refresh plugin for Vite integration

If expanding linting for a production application, consider enabling type-aware lint rules or adding `eslint-plugin-react-x` and `eslint-plugin-react-dom` for stricter React-specific rules.

## Development Notes

- The dev server uses React's Fast Refresh for instant HMR when editing components
- Build includes TypeScript type checking before Vite bundle creation
- The application is currently using the default Vite template structure; expansion will require organizing components into feature directories
