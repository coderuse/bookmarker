/* eslint-disable no-unused-vars */
import { BookmarkData } from '../types'

class GoogleDriveService {
  private accessToken: string | null = null
  private readonly BOOKMARKS_FILENAME = 'bookmarks.json'
  private readonly APP_FOLDER_NAME = 'BookmarkerApp'
  private readonly CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-client-id-here'
  private readonly SCOPES = 'https://www.googleapis.com/auth/drive.appdata'
  private readonly TOKEN_STORAGE_KEY = 'google_drive_token'
  private readonly TOKEN_EXPIRY_KEY = 'google_drive_token_expiry'
  private tokenClient: any = null

  async authenticate(): Promise<boolean> {
    try {
      // Check for existing token in localStorage
      this.loadStoredToken()
      
      // If we have a token, validate it
      if (this.accessToken) {
        const isValid = await this.validateToken()
        if (isValid) {
          await this.initializeGoogleIdentity()
          return true
        }
      }
      
      await this.initializeGoogleIdentity()
      return this.isSignedIn()
    } catch (error) {
      console.error('Authentication failed:', error)
      return false
    }
  }

  private loadStoredToken(): void {
    const storedToken = localStorage.getItem(this.TOKEN_STORAGE_KEY)
    const tokenExpiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY)
    
    if (storedToken && tokenExpiry) {
      const expiryTime = parseInt(tokenExpiry)
      const currentTime = Date.now()
      
      // Check if token is still valid (with 5 minute buffer)
      if (expiryTime > currentTime + 5 * 60 * 1000) {
        this.accessToken = storedToken
      } else {
        // Token expired, remove from storage
        this.clearStoredToken()
      }
    }
  }

  private async validateToken(): Promise<boolean> {
    if (!this.accessToken) return false

    try {
      // Test the token by making a simple API call
      const response = await fetch('https://www.googleapis.com/drive/v3/about?fields=user', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        // Token is invalid, clear it
        this.clearStoredToken()
        this.accessToken = null
        return false
      }

      return true
    } catch (error) {
      console.error('Token validation failed:', error)
      this.clearStoredToken()
      this.accessToken = null
      return false
    }
  }

  private storeToken(token: string, expiresIn: number = 3600): void {
    const expiryTime = Date.now() + (expiresIn * 1000)
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token)
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString())
  }

  private clearStoredToken(): void {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY)
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY)
  }

  private async initializeGoogleIdentity(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Load Google Identity Services
      if (!window.google) {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = () => {
          this.initializeTokenClient()
          resolve()
        }
        script.onerror = reject
        document.head.appendChild(script)
      } else {
        this.initializeTokenClient()
        resolve()
      }
    })
  }

  private initializeTokenClient(): void {
    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: (response: any) => {
        if (response.access_token) {
          this.accessToken = response.access_token
        }
      },
    })
  }

  async signIn(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.tokenClient) {
        console.error('Token client not initialized')
        resolve(false)
        return
      }

      // Override the callback for this specific sign-in
      this.tokenClient.callback = (response: any) => {
        if (response.access_token) {
          this.accessToken = response.access_token
          
          // Store token in localStorage with expiry
          const expiresIn = response.expires_in || 3600 // Default 1 hour
          this.storeToken(response.access_token, expiresIn)
          
          resolve(true)
        } else {
          console.error('No access token received:', response)
          resolve(false)
        }
      }

      // Request access token
      this.tokenClient.requestAccessToken({ prompt: 'consent' })
    })
  }

  async signOut(): Promise<void> {
    if (this.accessToken) {
      window.google?.accounts?.oauth2?.revoke(this.accessToken)
      this.accessToken = null
      this.clearStoredToken()
    }
  }

  isSignedIn(): boolean {
    return !!this.accessToken
  }

  async getAppFolder(): Promise<string | null> {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated')
      }

      // Search for existing app folder in appDataFolder
      const response = await fetch('https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
        q: `name='${this.APP_FOLDER_NAME}' and parents in 'appDataFolder' and mimeType='application/vnd.google-apps.folder'`,
        spaces: 'appDataFolder'
      }), {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (data.files && data.files.length > 0) {
        return data.files[0].id
      }

      // Create app folder if it doesn't exist
      const createResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.APP_FOLDER_NAME,
          mimeType: 'application/vnd.google-apps.folder',
          parents: ['appDataFolder']
        })
      })

      const createData = await createResponse.json()
      return createData.id || null
    } catch (error) {
      console.error('Error getting/creating app folder:', error)
      return null
    }
  }

  async saveBookmarks(bookmarkData: BookmarkData): Promise<boolean> {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated')
      }

      const appFolderId = await this.getAppFolder()
      if (!appFolderId) {
        throw new Error('Could not create/access app folder')
      }

      const bookmarksData = JSON.stringify(bookmarkData, null, 2)
      
      // Check if bookmarks file already exists
      const existingFiles = await fetch('https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
        q: `name='${this.BOOKMARKS_FILENAME}' and parents in '${appFolderId}'`,
        spaces: 'appDataFolder'
      }), {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      const existingData = await existingFiles.json()

      if (existingData.files && existingData.files.length > 0) {
        // Update existing file
        const fileId = existingData.files[0].id
        const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: bookmarksData
        })
        return response.ok
      } else {
        // Create new file
        const metadata = {
          name: this.BOOKMARKS_FILENAME,
          parents: [appFolderId]
        }

        const form = new FormData()
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
        form.append('file', new Blob([bookmarksData], { type: 'application/json' }))

        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          },
          body: form
        })
        return response.ok
      }
    } catch (error) {
      console.error('Error saving bookmarks:', error)
      return false
    }
  }

  async loadBookmarks(): Promise<BookmarkData> {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated')
      }

      const appFolderId = await this.getAppFolder()
      if (!appFolderId) {
        return { tabs: [] }
      }

      // Search for bookmarks file
      const response = await fetch('https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
        q: `name='${this.BOOKMARKS_FILENAME}' and parents in '${appFolderId}'`,
        spaces: 'appDataFolder'
      }), {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!data.files || data.files.length === 0) {
        return { tabs: [] }
      }

      const fileId = data.files[0].id
      if (!fileId) {
        return { tabs: [] }
      }

      // Download file content
      const fileResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      const fileContent = await fileResponse.text()
      
      try {
        const parsed = JSON.parse(fileContent)
        // Handle legacy format (array of bookmarks) and convert to new format
        if (Array.isArray(parsed)) {
          return {
            tabs: [{
              id: 'default',
              name: 'General',
              bookmarks: parsed
            }],
            activeTabId: 'default'
          }
        }
        return parsed
      } catch {
        return { tabs: [] }
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error)
      return { tabs: [] }
    }
  }

  getCurrentUser(): any {
    return this.accessToken ? { signedIn: true } : null
  }
}

// Global type declaration for Google Identity Services
declare global {
  interface Window {
    google: any
  }
}

export default new GoogleDriveService()