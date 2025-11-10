# ANRLunchAndLearn2025 - Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

---

## Part 1 of 5: Header and Project Overview

### Project Overview

**ANRLunchAndLearn2025** is a React JavaScript web application built with **Vite** that provides AI-powered chat functionality with a custom backend integration.  
The application features authentication, real-time chat, code editing, and project collaboration capabilities.

---

### Working Effectively

#### Bootstrap and Dependencies

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd ANRLunchAndLearn2025
   npm install  # Takes ~3 minutes initially. NEVER CANCEL.
   ```

   **Environment setup:**
   ```bash
   # For development
   npm run setup:env:dev

   # For test
   npm run setup:env:test

   # For production
   npm run setup:env:prod
   ```

   **Required files:** Ensure `backend_config.json` exists in project root for builds to succeed.

---

#### Build and Test Commands

- **Development server:**  
  ```bash
  npm run dev
  ```
  Starts on port **5173/5174**, ready in ~300ms

- **Production build:**  
  ```bash
  npm run build
  ```
  Takes ~10 seconds. **NEVER CANCEL.** Set timeout to 60+ minutes.

- **Development build:**  
  ```bash
  npm run build:dev
  ```

- **Test build:**  
  ```bash
  npm run build:test
  ```

- **Tests:**  
  ```bash
  npm run test
  ```
  Takes ~1.8 seconds. **NEVER CANCEL.** Set timeout to 30+ minutes.

- **Linting:**  
  ```bash
  npm run lint
  ```

- **Test with UI:**  
  ```bash
  npm run test:ui
  ```

---

#### Authentication and Local Development

- **Local Development Authentication:**  
  When `VITE_USE_LOCAL_AUTH=true` (development only):
  ```text
  Email: admin@admin.com
  Password: admin
  ```

  This bypasses backend authentication for faster development workflows.

- **Backend Authentication:** Custom authentication service for dev/test/prod environments  
- **Token Management:** JWT tokens stored in localStorage with local auth support

---

## Part 2 of 5: Validation and Tech Stack

### Always Validate Changes

**CRITICAL:** After making any changes to the application, ALWAYS run through these validation steps:

#### Build Validation
```bash
npm run build  # Must complete successfully in ~10 seconds
```

#### Test Validation
```bash
npm run test   # Must pass all tests in ~1.8 seconds
```

#### Development Server Validation
```bash
npm run dev    # Must start successfully and be accessible
```

#### Manual Application Testing
- Navigate to [http://localhost:5173](http://localhost:5173)
- Test login functionality with `admin@admin.com / admin`
- Verify main landing page loads with navigation
- Test one complete workflow (login → dashboard → feature interaction)

#### Linting Validation
```bash
npm run lint
```

---

### Manual Testing Scenarios

After making changes, ALWAYS test these scenarios:

- Authentication Flow: Login with local credentials and verify dashboard access
- Navigation: Test routing between different sections (home, login, register)
- Core Features: Test any modified functionality end-to-end
- Responsive Design: Verify UI works on different screen sizes
- Error Handling: Test edge cases and error scenarios

---

### Technology Stack

#### Frontend
- React 18.3.1: Functional components with hooks
- JavaScript (ES6+): Standardized language
- Vite: Build tool for fast development and optimized builds
- Custom CSS/SCSS: Styling framework
- React Router DOM: Client-side routing

#### Backend Integration
- Custom Backend Service: Full-stack framework for authentication and data
- Custom Auth Provider: Authentication and user management
- REST/GraphQL: API layer for data operations

#### Development Tools
- Vitest: Fast unit testing framework
- React Testing Library: Component testing utilities
- ESLint: Code linting with React and JavaScript rules
- Monaco Editor: Code editor integration

---

### File Structure

```
ANRLunchAndLearn2025/
├── _mocks/                     # Mock files for testing
├── backend/                    # Custom backend configuration
├── doco/                       # Project documentation
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images, icons, fonts
│   ├── auth/                   # Authentication components
│   ├── components/             # Reusable UI components
│   ├── config/                 # Configuration files
│   ├── context/                # React context providers
│   ├── routes/                 # Route definitions
│   ├── screens/                # Page components
│   ├── styles/                 # Global styles
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global CSS imports
├── .env.*                      # Environment configuration files
├── build.yml                   # Custom build configuration
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── vitest.config.js            # Vitest test configuration
```

---

## Part 3 of 5: React and JavaScript Guidelines (24 Standards)

1. Component Naming: Use PascalCase for all component names (e.g., UserProfileCard.jsx).  
2. File Extension: All React components must use the .jsx extension.  
3. Functional Components: Prefer functional components with hooks over class components.  
4. Arrow Functions: Use arrow functions for components and callback props.  
5. Hooks Rules: Strictly follow React hooks rules (no conditional hooks).  
6. Dependency Arrays: Always specify correct dependency arrays.  
7. State Immutability: Treat state as immutable.  
8. Prop Destructuring: Destructure props at the beginning of the component.  
9. One Component Per File: Limit each file to a single default export.  
10. Key Prop: Every element in an array mapping must have a unique key.  
11. Inline Functions: Avoid inline functions in props unless simple.  
12. Fragment Usage: Use short syntax `<>...</>`.  
13. Boolean Props: Use shorthand (`<Button disabled />`).  
14. Avoid Index as Key: Never use indices as keys unless static.  
15. Custom Hooks Naming: Prefix custom hooks with `use`.  
16. Conditional Rendering: Use short-circuit or ternary operators.  
17. Component Isolation: Keep components small and reusable.  
18. Prop Drilling: Use Context for deep prop passing.  
19. Event Handler Naming: Prefix with `handle`.  
20. Explicit Imports: Prefer named imports.  
21. Default Props: Define default values where applicable.  
22. Console Logs: Remove console logs before commit.  
23. Styling Convention: Avoid inline styles.  
24. Relative vs. Absolute Imports: Use relative imports within a feature folder.

---

## Part 4 of 5: Coding Practices and Build/Deployment

### Coding Practices

- Use arrow functions for components and hooks.  
- Use PascalCase for components.  
- Use camelCase for variables, functions, and hooks.  
- Include JSDoc comments for complex functions or components.  
- Follow SOLID principles and clean architecture.  
- Keep components under 500 lines.  

### Build and Deployment

#### Build Targets
- Development: `npm run build:dev`  
- Test: `npm run build:test`  
- Production: `npm run build`  

#### Deployment
- Automatic deployment via `build.yml`  
- Build output: `/dist/`  
- Environment variables: Managed through `.env.*`  

### Performance Notes
- Production builds may show chunk warnings (>500KB).  
- Monaco Editor increases bundle size.  
- Use dynamic imports for large dependencies.

### Troubleshooting Common Issues

#### Build Failures
- Missing `backend_config.json`  
- ESLint errors  
- Missing dependencies  

#### Authentication Issues
- Local auth not working → check `VITE_USE_LOCAL_AUTH=true`  
- Backend errors → check `backend_config.json`  
- Login failures → use `admin@admin.com/admin` for local dev

---

## Part 5 of 5: Server Issues, Reminders, and Configuration

### Development Server Issues
- Port conflicts: Vite will auto-assign new ports.  
- Hot reload issues: Restart `npm run dev`.  
- Ensure correct `.env` is loaded.  

### Critical Reminders
- **NEVER CANCEL** builds/tests.  
- **ALWAYS VALIDATE** builds, tests, and workflows.  
- **ALWAYS TEST** login with `admin@admin.com/admin`.  
- **ALWAYS LINT** before commits.  
- **TIMEOUTS:** 60+ min builds, 30+ min tests.  

### Environment Configuration

**Available Environments**
- Development  
- Test  
- Production  

**Environment Variables**
- `.env.development` – `VITE_USE_LOCAL_AUTH=true`  
- `.env.test` – Test config  
- `.env.production` – Production config  
- `.env.local` – Local overrides (gitignored)

---

applyTo: "/*.js,/*.jsx"
