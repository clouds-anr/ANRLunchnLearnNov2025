# ANR Fitness App

A modern React-based fitness application built with Vite, designed to help users discover and explore various exercises.

## Description

**ANR Fitness App** is a React JavaScript web application that provides users with a comprehensive exercise browsing experience. The application features a clean, responsive interface built with Material-UI components, allowing users to search for exercises, view detailed information, and navigate through a curated collection of fitness routines.

### Key Features

- **Exercise Browsing**: Browse through a comprehensive database of exercises
- **Exercise Search**: Search functionality to quickly find specific exercises
- **Detailed Exercise Views**: View detailed information about each exercise
- **Responsive Design**: Mobile-first responsive design using Material-UI
- **Fast Performance**: Built with Vite for optimal development and production performance
- **Modern React**: Leverages React 19 with functional components and hooks

## Technology Stack

### Frontend
- **React 19.2.0**: Modern functional components with hooks
- **JavaScript (ES6+)**: Standardized language
- **Vite 7.1.12**: Lightning-fast build tool and development server
- **Material-UI (MUI) 7.3.4**: Comprehensive UI component library
- **React Router DOM 7.9.5**: Client-side routing and navigation
- **Emotion**: CSS-in-JS styling solution

### Development Tools
- **ESLint**: Code linting with React and JavaScript rules
- **Vite Plugin React SWC**: Fast refresh and optimized builds
- **React Loader Spinner**: Loading state indicators

## Installation

Follow these step-by-step instructions to set up the project locally:

### Prerequisites
- **Node.js** (version 16.x or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ANRLunchnLearnNov2025
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   > **Note**: Initial installation takes approximately 3 minutes. Do not cancel the process.

3. **Verify installation**:
   ```bash
   npm run lint
   ```

## Usage

### Running the Development Server

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:5173
- **Network**: Check terminal output for network URL

The development server typically starts in ~300ms and supports hot module replacement (HMR) for instant updates.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

> **Note**: Production builds complete in approximately 10 seconds. Do not cancel the build process.

The build output will be generated in the `/dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Code Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

## Project Structure

```
ANRLunchnLearnNov2025/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images, icons, fonts
│   │   ├── icons/              # Icon assets
│   │   └── images/             # Image assets
│   ├── components/             # Reusable UI components
│   │   ├── Exercises.jsx       # Exercise list component
│   │   ├── Footer.jsx          # Footer component
│   │   ├── HeroBanner.jsx      # Hero banner component
│   │   ├── Navbar.jsx          # Navigation bar component
│   │   └── SearchExercises.jsx # Exercise search component
│   ├── pages/                  # Page components
│   │   ├── ExerciseDetail.jsx  # Exercise detail page
│   │   └── Home.jsx            # Home page
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
├── .github/                    # GitHub configuration
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (port 5173) |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint code quality checks |
| `npm run preview` | Preview production build locally |

## Coding Standards

This project follows strict React and JavaScript coding standards:

### React Guidelines
- ✅ Use **PascalCase** for component names
- ✅ All React components use `.jsx` extension
- ✅ Prefer **functional components** with hooks
- ✅ Use **arrow functions** for components
- ✅ **Destructure props** at component start
- ✅ One component per file
- ✅ Use unique keys in array mappings
- ✅ Prefix custom hooks with `use`
- ✅ Prefix event handlers with `handle`

### Code Quality
- Use **camelCase** for variables, functions, and hooks
- Keep components under **500 lines**
- Avoid inline styles (use Material-UI styling)
- Remove console logs before commits
- Include JSDoc comments for complex functions

## Performance Notes

- Development server starts in ~300ms
- Production builds complete in ~10 seconds
- Hot Module Replacement (HMR) provides instant feedback during development
- Optimized bundle sizes using Vite's build optimization

## Troubleshooting

### Common Issues

**Port Conflicts**
- If port 5173 is in use, Vite will automatically assign a new port
- Check terminal output for the actual port being used

**Hot Reload Not Working**
- Restart the development server with `npm run dev`
- Clear browser cache and hard reload

**Build Failures**
- Ensure all dependencies are installed: `npm install`
- Check for ESLint errors: `npm run lint`
- Verify Node.js version is 16.x or higher

**Module Not Found Errors**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary. All rights reserved.

## Contribution Guidelines

### Contributing to the Project

We welcome contributions! Please follow these guidelines:

1. **Fork the repository** and create a new branch for your feature
2. **Follow coding standards** outlined in this README
3. **Test your changes** thoroughly before submitting
4. **Run linting** with `npm run lint` to ensure code quality
5. **Submit a pull request** with a clear description of changes

### Code Review Process

- All pull requests require review before merging
- Ensure all checks pass (linting, builds)
- Follow the project's coding standards and best practices

### Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

## Contact Information

For questions, support, or contributions:

- **Repository Issues**: Use GitHub Issues for bug reports and feature requests
- **Project Owner**: Check repository settings for maintainer contact
- **Development Team**: ANR Development Team

## Acknowledgments

Built with:
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Material-UI](https://mui.com/) - Component library
- [React Router](https://reactrouter.com/) - Routing solution

---

**Version**: 0.0.0  
**Last Updated**: November 2025  
**Status**: Active Development
