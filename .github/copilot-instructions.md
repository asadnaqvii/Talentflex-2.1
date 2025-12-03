# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js project with the following setup:
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **Package Manager**: npm

## Code Style Guidelines
- Use TypeScript for all new components and utilities
- Follow React functional component patterns with hooks
- Use Tailwind CSS for styling
- Organize code in the `src/` directory structure
- Use the `@/` import alias for internal imports
- Follow Next.js App Router conventions for routing and layouts

## Component Guidelines
- Create reusable components in `src/components/`
- Use proper TypeScript interfaces for props
- Include proper error handling and loading states
- Follow accessibility best practices
- Use Server Components by default, Client Components when needed

## File Organization
- Pages: `src/app/` (App Router)
- Components: `src/components/`
- Utilities: `src/lib/`
- Types: `src/types/`
- Styles: Use Tailwind classes, custom CSS in `src/app/globals.css`
