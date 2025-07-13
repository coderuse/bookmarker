import { useState, useEffect } from 'react'
import { Button, Typography, Space, message, Alert } from 'antd'
import { Link } from 'react-router-dom'
import { GoogleOutlined, CloudSyncOutlined } from '@ant-design/icons'
import BookmarkTabs from '../components/BookmarkTabs'
import googleDriveService from '../services/googleDrive'
import { BookmarkData } from '../types'

const { Title } = Typography

const Home = () => {
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [bookmarkData, setBookmarkData] = useState<BookmarkData>({ tabs: [] })

  useEffect(() => {
    initializeGoogleDrive()
  }, [])

  const initializeGoogleDrive = async () => {
    try {
      setIsLoading(true)
      
      // Always load from localStorage first
      const savedData = localStorage.getItem('bookmarkData')
      const localData = savedData ? JSON.parse(savedData) : { tabs: [] }
      setBookmarkData(localData)
      
      // Try to authenticate with Google Drive
      const authenticated = await googleDriveService.authenticate()
      
      if (authenticated && googleDriveService.isSignedIn()) {
        setIsGoogleSignedIn(true)
        await syncWithGoogleDrive(localData)
      }
    } catch (error) {
      console.error('Error initializing Google Drive:', error)
      // Continue with localStorage data (already loaded above)
    } finally {
      setIsLoading(false)
    }
  }

  const syncWithGoogleDrive = async (localData: BookmarkData) => {
    try {
      const driveData = await googleDriveService.loadBookmarks()
      
      if (driveData.tabs.length > 0) {
        // Use drive data and save to localStorage
        localStorage.setItem('bookmarkData', JSON.stringify(driveData))
        setBookmarkData(driveData)
        message.success('Bookmarks synced from Google Drive!')
      } else if (localData.tabs.length > 0) {
        // Upload local data to drive
        await saveToGoogleDrive(localData)
      }
    } catch (error) {
      console.error('Error syncing with Google Drive:', error)
      message.warning('Could not sync with Google Drive, using local bookmarks')
    }
  }

  const saveToGoogleDrive = async (data: BookmarkData) => {
    if (!isGoogleSignedIn) return

    try {
      setIsSyncing(true)
      const success = await googleDriveService.saveBookmarks(data)
      if (success) {
        message.success('Bookmarks synced with Google Drive!')
      } else {
        message.error('Failed to sync bookmarks with Google Drive')
      }
    } catch (error) {
      console.error('Error saving bookmarks to Drive:', error)
      message.error('Failed to sync bookmarks with Google Drive')
    } finally {
      setIsSyncing(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const success = await googleDriveService.signIn()
      if (success) {
        setIsGoogleSignedIn(true)
        message.success('Signed in to Google Drive successfully!')
        await syncWithGoogleDrive(bookmarkData)
      } else {
        message.error('Failed to sign in to Google Drive')
      }
    } catch (error) {
      console.error('Error signing in:', error)
      message.error('Failed to sign in to Google Drive')
    }
  }

  const handleGoogleSignOut = async () => {
    try {
      await googleDriveService.signOut()
      setIsGoogleSignedIn(false)
      message.success('Signed out of Google Drive')
    } catch (error) {
      console.error('Error signing out:', error)
      message.error('Failed to sign out of Google Drive')
    }
  }

  const handleDataChange = (newData: BookmarkData) => {
    setBookmarkData(newData)
    localStorage.setItem('bookmarkData', JSON.stringify(newData))
    
    if (isGoogleSignedIn) {
      saveToGoogleDrive(newData)
    }
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Title level={3}>Initializing Bookmarker...</Title>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Bookmarker {isSyncing && <CloudSyncOutlined spin style={{ color: '#1890ff' }} />}
        </Title>
        
        <Space>
          {!isGoogleSignedIn ? (
            <Button 
              icon={<GoogleOutlined />}
              onClick={handleGoogleSignIn}
              style={{ marginRight: '8px' }}
            >
              Sign in with Google
            </Button>
          ) : (
            <Button 
              icon={<GoogleOutlined />}
              onClick={handleGoogleSignOut}
              style={{ marginRight: '8px' }}
              type="default"
            >
              Sign out
            </Button>
          )}
          <Link to="/about">
            <Button type="link" size="large">
              About
            </Button>
          </Link>
        </Space>
      </div>

      {!isGoogleSignedIn && (
        <Alert
          message="Google Drive Sync Disabled"
          description="Sign in with Google to sync your bookmarks across devices."
          type="info"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      <BookmarkTabs 
        bookmarkData={bookmarkData}
        onDataChange={handleDataChange}
      />
    </div>
  )
}

export default Home;
