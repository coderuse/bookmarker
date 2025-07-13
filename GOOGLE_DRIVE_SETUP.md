# Google Drive Integration Setup

This application uses Google Drive API with Google Identity Services to sync bookmarks across devices. Follow these steps to set up Google Drive integration:

## 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click on it and press "Enable"

## 2. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application" as the application type
4. Add authorized JavaScript origins:
   - For development: `http://localhost:3000` (or the port your app runs on)
   - For Vite dev server: `http://localhost:5173` 
   - For production: Add your production domain (e.g., `https://coderuse.github.io`)
5. **Important**: You do NOT need to add redirect URIs for Google Identity Services
6. Copy the generated Client ID



## 3. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Replace `your-google-oauth-client-id-here` with your actual Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
   ```

## 4. How It Works

- **Modern Authentication**: Uses Google Identity Services (GIS) for secure OAuth2 authentication
- **App Data Folder**: The application creates a private folder in Google Drive's app data folder
- **Automatic Sync**: Bookmarks are automatically synced when you add or remove them
- **Privacy**: Only this application can access its own folder - other apps cannot see your bookmarks
- **Fallback**: If Google Drive is not available, bookmarks are stored locally in browser storage
- **No Popups**: Uses modern token-based authentication without popup blocking issues

## 5. User Experience

1. Users will see a "Sign in with Google" button when they first visit
2. After signing in, existing bookmarks (if any) will be loaded from Google Drive
3. **Persistent Sign-in**: Authentication state is preserved across page refreshes
4. **Automatic Token Refresh**: Expired tokens are automatically handled
5. All bookmark changes will be automatically synced to Google Drive
6. A sync indicator shows when data is being saved

## Security Notes

- The application only requests access to its own app data folder
- No access to other files in Google Drive
- Users can revoke access anytime from their Google Account settings
- **Token Storage**: Access tokens are stored in browser localStorage with expiry tracking
- **Auto-cleanup**: Expired tokens are automatically removed from storage
- **Token Validation**: Stored tokens are validated on each app startup