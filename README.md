# Bookmarker - Free Online Bookmark Manager

A free, modern bookmark manager with Google Drive sync. Organize your bookmarks in tabs, access them across all devices, and keep your favorite websites organized. Always free, no ads.

## 🚀 Key Features

### 📚 Bookmark Organization
- **Tab-based Organization** - Create multiple tabs to categorize your bookmarks (Work, Personal, Learning, etc.)
- **Unlimited Bookmarks** - Add as many bookmarks as you need, completely free
- **Quick Actions** - Copy URLs, delete bookmarks, and organize with ease
- **Search & Filter** - Find your bookmarks instantly

### ☁️ Cloud Sync & Access
- **Google Drive Sync** - Securely sync your bookmarks across all devices
- **Cross-device Access** - Access your bookmarks from any device with internet
- **Offline Support** - Works offline with local storage backup
- **Persistent Sign-in** - Stay signed in across browser sessions

### 🆓 Always Free
- **Completely Free** - No subscription fees, ever
- **No Ads** - Clean, distraction-free interface
- **No Limits** - Unlimited bookmarks and tabs
- **Privacy First** - Your data stays in your Google Drive

### 🔧 User Experience
- **Modern Interface** - Clean, intuitive design with Ant Design components
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Fast & Lightweight** - Quick loading and smooth performance
- **Easy Setup** - Get started in minutes with Google sign-in

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
   cd bookmarker
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
bookmarker/
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