# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the INNOQ Styleguide - a comprehensive design system and component library built with Fractal.js. It serves as both a living styleguide and a distributable npm package for INNOQ's corporate design system.

## Development Commands

### Essential Commands
- `npm start` - Start development server with hot reload
- `npm run compile` - Build assets using Faucet Pipeline
- `npm run site` - Generate static site with Fractal
- `npm test` - Run all linting (ESLint, Stylelint, Prettier)
- `npm run release` - Create new version release
- `npm run dist` - Build distribution files

### Build System
The project uses **Faucet Pipeline** for asset compilation:
- Compiles Sass to CSS
- Bundles JavaScript modules  
- Processes static assets with versioning
- Configuration in `faucet.config.js`

## Architecture

### Atomic Design Structure
Components are organized using Atomic Design methodology in `/components/`:
- `06-subatoms/` - Design tokens (colors, gradients, shadows)
- `05-atoms/` - Basic UI elements (buttons, forms, icons, typography)
- `04-molecules/` - Compound components (cards, teasers, navigation)
- `03-organisms/` - Complex sections (headers, footer, forms)
- `02-layouts/` - Layout components (containers, grids)
- `01-pages/` - Complete page templates

### Component Structure
Each component follows this pattern:
```
component-name/
├── _component-name.scss      # Styles
├── component-name.html       # Template
├── component-name.config.yml # Configuration & sample data
├── component-name.js         # JavaScript (if needed)
└── README.md                # Documentation
```

### Core Assets (`/lib/`)
- `styles/` - Global Sass foundation (typography, colors, utilities)
- `scripts/` - JavaScript entry point and utilities
- `images/` - Static assets (icons, logos, backgrounds)

## Technology Stack

### CSS Architecture
- **Sass/SCSS** with modular architecture
- **ITCSS methodology** (Inverted Triangle CSS)
- **BEM naming convention** enforced via Stylelint
- **Utility-first approach** for spacing and layout

### JavaScript
- **ES6 modules** with Web Components (Custom Elements)
- **Progressive enhancement** - components work without JavaScript
- **Browser environment** targeting (not Node.js)

### Code Quality
- **ESLint** for JavaScript (ES6, browser environment)
- **Stylelint** for Sass/CSS (BEM methodology, clean order)
- **Prettier** for formatting (no semicolons, single quotes)

## Key Development Patterns

### Progressive Enhancement
- Components must work without JavaScript
- Enhanced functionality added via Web Components
- Accessibility-first design approach

### Component Development
- Use existing components as templates for new ones
- Follow atomic design principles when categorizing
- Include comprehensive documentation in README.md
- Provide sample data in `.config.yml` files

### Asset Management
- Static assets go in `/lib/images/`
- Use Faucet Pipeline for asset processing
- Assets are automatically versioned and manifested

## Testing & Quality Assurance

Always run `npm test` before committing changes. This includes:
- ESLint JavaScript validation
- Stylelint CSS/Sass validation  
- Prettier code formatting

## Deployment

The project auto-deploys to https://innoq.style/ via GitHub Actions when changes are pushed to main branch.