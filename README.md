# React Starter Template

A modern, feature-rich React TypeScript starter template with a comprehensive tech stack for building robust web applications.

## 🚀 Features

### Core Technologies
- **React 18** - Latest version with modern features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for single-page applications

### UI & Styling
- **Ant Design** - Professional React UI library with rich components
- **SCSS/Sass** - Enhanced CSS with variables, mixins, and nested selectors
- **Responsive Design** - Mobile-first approach with media queries

### State Management & API
- **TanStack React Query** - Powerful server state management
- **Axios** - HTTP client for API requests
- **Custom Hooks** - Reusable logic for API interactions

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript Compiler** - Type checking and compilation
- **Hot Module Replacement** - Fast development with instant updates
- **Pre-commit Hooks** - Automated code quality checks before commits
- **Knip** - Unused dependency and export detection
- **GitHub Actions** - Automated CI/CD pipeline for deployment

## 📦 What's Included

### Components
- **Tab-based Bookmark Manager** - Organized bookmark system with:
  - Multiple bookmark tabs for categorization
  - Add, rename, and delete tabs
  - Google Drive sync for cross-device access
  - Local storage fallback
  - Add, delete, and organize bookmarks within tabs
  - Copy URL functionality
- **Home Page** - Main application interface featuring:
  - Tab-based bookmark management system
  - Google Drive authentication
  - Centralized bookmark organization
- **About Page** - Feature overview and technology stack

### API Integration
- **Google Drive API** - Bookmark synchronization featuring:
  - OAuth2 authentication
  - App data folder management
  - Automatic sync on bookmark changes
  - Cross-device bookmark access
- **JSONPlaceholder API** - Demo integration showing:
  - Data fetching with loading states
  - Error handling
  - Caching and background refetching
  - Parallel and dependent queries

### Advanced Features
- **Server State Management** - Optimistic updates and synchronization
- **Loading States** - Smooth user experience with spinners
- **Error Boundaries** - Graceful error handling
- **Responsive Design** - Works on all device sizes

## 🛠️ Installation

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn**

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-starter-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Google Drive integration (optional):
   ```bash
   cp .env.example .env
   # Edit .env and add your Google OAuth Client ID
   ```
   See [GOOGLE_DRIVE_SETUP.md](./GOOGLE_DRIVE_SETUP.md) for detailed setup instructions.

## 🚀 Usage

### Development
Start the development server:
```bash
npm run dev
```
- Opens automatically at `http://localhost:3000`
- Hot reload enabled for instant updates

### Building
Build for production:
```bash
npm run build
```
- Generates optimized build in `dist/` folder
- Includes type checking and bundling

### Preview
Preview the production build:
```bash
npm run preview
```
- Serves the built files locally for testing

### Linting
Run code quality checks:
```bash
npm run lint
```
- Checks for code quality issues
- Enforces consistent coding standards

### Pre-commit Hooks
Automated quality checks run before every commit:
- **ESLint** - Ensures code quality and consistency
- **TypeScript Build** - Verifies type safety and compilation
- **Knip Analysis** - Detects unused dependencies and exports

The pre-commit hook automatically runs these checks when you commit changes, preventing issues from entering the repository. If any check fails, the commit is blocked until the issues are resolved. To bypass the hook temporarily, use `git commit --no-verify`.

### GitHub Pages Deployment
Automated deployment to GitHub Pages using GitHub Actions:
- **Continuous Integration** - Runs on every push to main branch
- **Build Process** - Installs dependencies, runs linting, and builds the project
- **Automatic Deployment** - Deploys built files to `site` branch for GitHub Pages
- **Pull Request Checks** - Validates builds on pull requests without deploying

The workflow automatically builds and deploys your application whenever you push changes to the main branch. Configure GitHub Pages to use the `site` branch as the source to serve your application.

## 📁 Project Structure

```
react-starter-template/
├── .github/
│   └── workflows/        # GitHub Actions workflows
│       └── deploy.yml    # Build and deploy workflow
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   └── Navigation.tsx # Navigation component
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Home page with API demo
│   │   └── About.tsx     # About page
│   ├── hooks/            # Custom React hooks
│   │   └── useApi.ts     # API interaction hooks
│   ├── services/         # API and service layer
│   │   └── api.ts        # API client and types
│   ├── App.tsx           # Main application component
│   ├── App.scss          # Application styles
│   ├── main.tsx          # Application entry point
│   └── index.scss        # Global styles
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## 🎯 Key Capabilities

### 1. **Modern React Development**
- Function components with hooks
- TypeScript for type safety
- Latest React 18 features

### 2. **Professional UI Components**
- Ant Design component library
- Consistent design system
- Responsive layouts with Grid and Flexbox

### 3. **Advanced State Management**
- TanStack React Query for server state
- Automatic caching and synchronization
- Background refetching and optimistic updates

### 4. **API Integration**
- Axios for HTTP requests
- Custom hooks for data fetching
- Error handling and loading states

### 5. **Enhanced Styling**
- SCSS with variables and mixins
- Responsive design patterns
- Component-scoped styles

### 6. **Developer Experience**
- Fast development with Vite
- Type checking with TypeScript
- Code quality with ESLint
- Hot module replacement
- Pre-commit hooks for automated quality assurance
- GitHub Actions for continuous deployment

## 🔧 Customization

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`

### API Integration
1. Define types in `src/services/api.ts`
2. Create custom hooks in `src/hooks/useApi.ts`
3. Use hooks in components for data fetching

### Styling
1. Add variables in `src/App.scss`
2. Create mixins for reusable styles
3. Use nested selectors for organization

## 🌟 Demo Features

Visit the running application to see:
- **Multiple Bookmark Tabs** - Organize bookmarks by category (Work, Personal, Learning, etc.)
- **Tab Management** - Create, rename, and delete tabs
- **Google Drive Integration** - Sync all your organized bookmarks across devices

### 🔖 Bookmark Features
- **Tab Organization** - Create multiple tabs to categorize your bookmarks
- **Tab Management** - Add, rename, and delete tabs as needed
- **Google Drive Sync** - Sign in to sync all tabs and bookmarks across devices
- **Local Storage** - Works offline with browser storage
- **Quick Actions** - Copy URLs and delete bookmarks with one click
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Auto-sync** - Changes are automatically saved to Google Drive
- **Legacy Support** - Automatically converts old bookmark lists to tab format

## 📚 Learning Resources

This template demonstrates:
- Modern React patterns and best practices
- TypeScript integration in React applications
- Professional UI development with Ant Design
- Server state management with React Query
- SCSS preprocessing and responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding!** 🎉

This template provides a solid foundation for building modern React applications with TypeScript, professional UI components, and robust state management.