import { useState } from 'react'
import { Tabs, Button, Modal, Input, Form, message, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import BookmarkList from './BookmarkList'
import { BookmarkData, BookmarkTab } from '../types'

interface BookmarkTabsProps {
  bookmarkData: BookmarkData
  // eslint-disable-next-line no-unused-vars
  onDataChange: (data: BookmarkData) => void
}

interface AddTabFormData {
  name: string
}

const BookmarkTabs = ({ bookmarkData, onDataChange }: BookmarkTabsProps) => {
  const [isAddTabModalVisible, setIsAddTabModalVisible] = useState(false)
  const [form] = Form.useForm()

  const handleAddTab = (values: AddTabFormData) => {
    const newTab: BookmarkTab = {
      id: Date.now().toString(),
      name: values.name,
      bookmarks: []
    }

    const newData: BookmarkData = {
      ...bookmarkData,
      tabs: [...bookmarkData.tabs, newTab],
      activeTabId: newTab.id
    }

    onDataChange(newData)
    setIsAddTabModalVisible(false)
    form.resetFields()
    message.success('Tab added successfully!')
  }

  const handleDeleteTab = (tabId: string) => {
    if (bookmarkData.tabs.length <= 1) {
      message.warning('Cannot delete the last tab!')
      return
    }

    Modal.confirm({
      title: 'Delete Tab',
      content: 'Are you sure you want to delete this tab and all its bookmarks?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        const newTabs = bookmarkData.tabs.filter(tab => tab.id !== tabId)
        const newActiveTabId = newTabs.length > 0 ? newTabs[0].id : undefined

        const newData: BookmarkData = {
          ...bookmarkData,
          tabs: newTabs,
          activeTabId: newActiveTabId
        }

        onDataChange(newData)
        message.success('Tab deleted successfully!')
      }
    })
  }

  const handleTabChange = (activeKey: string) => {
    const newData: BookmarkData = {
      ...bookmarkData,
      activeTabId: activeKey
    }
    onDataChange(newData)
  }

  const handleTabEdit = (targetKey: any, action: 'add' | 'remove') => {
    if (action === 'add') {
      setIsAddTabModalVisible(true)
    } else if (action === 'remove') {
      handleDeleteTab(targetKey)
    }
  }

  const handleBookmarksChange = (tabId: string, newBookmarks: any[]) => {
    const newTabs = bookmarkData.tabs.map(tab => 
      tab.id === tabId ? { ...tab, bookmarks: newBookmarks } : tab
    )

    const newData: BookmarkData = {
      ...bookmarkData,
      tabs: newTabs
    }

    onDataChange(newData)
  }

  // Initialize with default tab if no tabs exist
  if (bookmarkData.tabs.length === 0) {
    const defaultTab: BookmarkTab = {
      id: 'default',
      name: 'General',
      bookmarks: []
    }

    const initialData: BookmarkData = {
      tabs: [defaultTab],
      activeTabId: defaultTab.id
    }

    onDataChange(initialData)
    return null
  }

  const tabItems = bookmarkData.tabs.map(tab => ({
    key: tab.id,
    label: tab.name,
    children: (
      <BookmarkList
        bookmarks={tab.bookmarks}
        onBookmarksChange={(newBookmarks) => handleBookmarksChange(tab.id, newBookmarks)}
      />
    )
  }))

  return (
    <div>
      <Tabs
        type="editable-card"
        activeKey={bookmarkData.activeTabId}
        onChange={handleTabChange}
        onEdit={handleTabEdit}
        items={tabItems}
        addIcon={<PlusOutlined />}
      />

      <Modal
        title="Add New Tab"
        open={isAddTabModalVisible}
        onCancel={() => {
          setIsAddTabModalVisible(false)
          form.resetFields()
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddTab}
        >
          <Form.Item
            name="name"
            label="Tab Name"
            rules={[{ required: true, message: 'Please enter tab name' }]}
          >
            <Input placeholder="Enter tab name" />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Tab
              </Button>
              <Button onClick={() => {
                setIsAddTabModalVisible(false)
                form.resetFields()
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BookmarkTabs