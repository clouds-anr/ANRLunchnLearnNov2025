# ANRChat - Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview

ANRChat is a React TypeScript web application built with Vite that provides AI-powered chat functionality with AWS Amplify backend integration. The application features authentication, real-time chat, code editing, and project collaboration capabilities.

## Working Effectively

### Bootstrap and Dependencies
1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd ANRChat
   npm install  # Takes ~3 minutes initially. NEVER CANCEL.
   ```

2. **Environment setup**:
   ```bash
   # For development
   npm run setup:env:dev
   
   # For test
   npm run setup:env:test
   
   # For production  
   npm run setup:env:prod
   ```

3. **Required files**: Ensure `amplify_outputs.json` exists in project root for builds to succeed.

### Build and Test Commands
- **Development server**: `npm run dev` - Starts on port 5173/5174, ready in ~300ms
- **Production build**: `npm run build` - Takes ~10 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
- **Development build**: `npm run build:dev` - For dev environment
- **Test build**: `npm run build:test` - For test environment
- **Tests**: `npm run test` - Takes ~1.8 seconds. NEVER CANCEL. Set timeout to 30+ minutes.
- **Linting**: `npm run lint` - ESLint with React rules
- **Test with UI**: `npm run test:ui` - Vitest UI mode

### Authentication and Local Development
- **Local Development Authentication**: When `VITE_USE_LOCAL_AUTH=true` (development only):
  - **Email**: admin@admin.com
  - **Password**: admin
  - This bypasses backend authentication for faster development workflows
- **Backend Authentication**: AWS Cognito integration for dev/test/prod environments
- **Token Management**: JWT tokens stored in localStorage with local auth support

## Validation Requirements

### Always Validate Changes
**CRITICAL**: After making any changes to the application, ALWAYS run through these validation steps:

1. **Build Validation**:
   ```bash
   npm run build  # Must complete successfully in ~10 seconds
   ```

2. **Test Validation**:
   ```bash
   npm run test   # Must pass all tests in ~1.8 seconds
   ```

3. **Development Server Validation**:
   ```bash
   npm run dev    # Must start successfully and be accessible
   ```

4. **Manual Application Testing**:
   - Navigate to `http://localhost:5173`
   - Test login functionality with admin@admin.com/admin
   - Verify main landing page loads with navigation
   - Test at least one complete user workflow (login → dashboard → feature interaction)

5. **Linting Validation**:
   ```bash
   npm run lint   # Address any critical issues
   ```

### Manual Testing Scenarios
After making changes, ALWAYS test these scenarios:
- **Authentication Flow**: Login with local credentials and verify dashboard access
- **Navigation**: Test routing between different sections (home, login, register)
- **Core Features**: Test any modified functionality end-to-end
- **Responsive Design**: Verify UI works on different screen sizes
- **Error Handling**: Test edge cases and error scenarios

## Technology Stack

### Frontend
- **React 18.3.1**: Functional components with hooks
- **TypeScript**: Type safety and improved developer experience
- **Vite**: Build tool for fast development and optimized builds
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router DOM**: Client-side routing

### Backend Integration
- **AWS Amplify**: Full-stack framework for authentication and backend
- **AWS Cognito**: Authentication and user management
- **GraphQL/AppSync**: API layer for data operations

### Development Tools
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities  
- **ESLint**: Code linting with React and TypeScript rules
- **Monaco Editor**: Code editor integration

## Coding Standards

### File Structure
```
ANRChat/
├── _mocks/                     # Mock files for testing
├── amplify/                    # AWS Amplify backend configuration
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
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global CSS imports
├── .env.*                      # Environment configuration files
├── amplify.yml                 # Amplify build configuration
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── vitest.config.js            # Vitest test configuration
└── tailwind.config.js          # Tailwind CSS configuration
```

### React and TypeScript Guidelines
- Use functional components with hooks; avoid class components
- Prefer `interface` for component props; use `type` for unions
- Use TypeScript for all new code; avoid `any` type
- Follow React hooks rules (no conditional hooks)
- Use `useState`, `useEffect`, and custom hooks for state management
- Keep components small, focused, and reusable
- Use TypeScript for all code.
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safe navigation.
- Prefer immutable data with `const` and `readonly`.
- Avoid `any` type; always define specific types or use `unknown` when necessary.
- Use explicit return types for functions and hooks.

### Styling Guidelines
- Use **Tailwind CSS** utility classes for styling
- Avoid inline styles; use Tailwind responsive utilities
- Place CSS Modules in the same directory as the component (e.g., `MyComponent.module.css`).
- Ensure responsive design with Tailwind’s responsive utilities (e.g., `sm:`, `md:`).

## Styling Example
```typescript
// Good
import styles from './MyComponent.module.css';

const MyComponent: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-center">
    <p className={styles.text}>Hello, World!</p>
  </div>
);

// Bad
const MyComponent: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <p className="text">Hello, World!</p>
  </div>
);
```

### React Guidelines
- Use functional components with hooks; avoid class components.
- Follow React hooks rules (e.g., no conditional hooks).
- Type components with `React.FC` for components with children.
- Keep components small, focused, and reusable.
- Use error boundaries for components that may fail.
- Prefer `useState`, `useEffect`, and custom hooks for state management over external libraries unless specified.

## Coding Practices
- Use arrow functions for components and hooks (e.g., `const MyComponent = () => { ... }`).
- Use PascalCase for component names (e.g., `MyComponent.tsx`).
- Use camelCase for variables, functions, and hooks.
- Include JSDoc comments for complex functions or components.
- Follow SOLID principles and clean architecture where applicable.
- Use relative imports within the same feature folder; use absolute imports with aliases (e.g., `@/components/MyComponent`) if configured in `tsconfig.json`.
- Keep component lines of code below 500.

### Testing Guidelines
- Write unit tests using **Vitest** and **React Testing Library**
- Use `describe` blocks to group tests by component or functionality.
- Mock sub-components and external dependencies using `vi.mock`.
- Aim for at least 80% test coverage.
- Follow the Arrange-Act-Assert pattern for test structure.
- Test component behavior, not implementation details

## Testing Example
```typescript
// Good
describe('MyComponent', () => {
  test('renders correctly with props', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

// Bad
test('renders', () => {
  render(<MyComponent />);
});
```

## Build and Deployment

### Build Targets
- **Development**: `npm run build:dev` - Development environment build
- **Test**: `npm run build:test` - Test environment build
- **Production**: `npm run build` - Production-ready build with optimizations

### Deployment
- **AWS Amplify**: Automatic deployment via amplify.yml configuration
- **Build Output**: Vite builds to `dist/` directory
- **Environment Variables**: Managed through `.env.*` files loaded by env-cmd

### Performance Notes
- Production builds may show chunk size warnings (>500KB) - this is expected
- Monaco Editor and dependencies contribute to bundle size
- Use dynamic imports for code splitting when adding large dependencies

## Troubleshooting Common Issues

### Build Failures
- **Missing amplify_outputs.json**: Create mock file in project root
- **ESLint errors**: Address critical linting issues before committing
- **Missing dependencies**: Run `npm install` to ensure all packages are installed

### Authentication Issues
- **Local auth not working**: Verify `VITE_USE_LOCAL_AUTH=true` in .env.development
- **Amplify errors**: Check AWS configuration in amplify_outputs.json
- **Login failures**: Use admin@admin.com/admin for local development

### Development Server Issues  
- **Port conflicts**: Vite will automatically try alternative ports (5174, etc.)
- **Hot reload issues**: Restart development server with `npm run dev`
- **Environment variables**: Ensure correct .env file is loaded for target environment

## Critical Reminders

- **NEVER CANCEL** build or test commands - they complete quickly (~10 seconds for builds, ~2 seconds for tests)
- **ALWAYS** validate changes by running builds, tests, and manual testing scenarios
- **ALWAYS** test login functionality with admin@admin.com/admin after authentication changes
- **ALWAYS** run `npm run lint` before committing changes
- Set appropriate timeouts: 60+ minutes for builds, 30+ minutes for tests (actual times are much shorter)

## Environment Configuration

### Available Environments
- **Development**: Local development with hot reload and local authentication
- **Test**: Testing environment configuration without local auth bypass
- **Production**: Production-ready build with optimizations

### Environment Variables
- `.env.development` - Development settings with `VITE_USE_LOCAL_AUTH=true`
- `.env.test` - Test environment settings
- `.env.production` - Production environment settings
- `.env.local` - Local overrides (not committed to version control)

---
applyTo: "**/*.ts,**/*.tsx,**/*.js,**/*.jsx"
---