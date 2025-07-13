import { useState } from "react";
import { Button, Modal, Input, Form, Card, message, Space } from "antd";
import { PlusOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Bookmark } from "../types";
import "./bookmark.scss";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  // eslint-disable-next-line no-unused-vars
  onBookmarksChange: (bookmarks: Bookmark[]) => void;
}

interface AddBookmarkFormData {
  name: string;
  url: string;
}

const BookmarkList = ({ bookmarks, onBookmarksChange }: BookmarkListProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddBookmark = (values: AddBookmarkFormData) => {
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      name: values.name,
      url: values.url.startsWith("http") ? values.url : `https://${values.url}`,
    };

    const newBookmarks = [...bookmarks, newBookmark];
    onBookmarksChange(newBookmarks);
    setIsModalVisible(false);
    form.resetFields();
    message.success("Bookmark added successfully!");
  };

  const handleDeleteBookmark = (bookmarkId: string) => {
    const newBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== bookmarkId
    );
    onBookmarksChange(newBookmarks);
    message.success("Bookmark deleted successfully!");
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      message.success("URL copied to clipboard!");
    } catch (error) {
      message.error("Failed to copy URL");
    }
  };

  const openUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bookmark-container">
      <div className="bookmark-header">
        <h3>Bookmarks ({bookmarks.length})</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Bookmark
        </Button>
      </div>

      <div className="bookmark-columns">
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.id} className="bookmark-card" size="small">
            <div className="bookmark-content">
              <div
                className="bookmark-name"
                onClick={() => openUrl(bookmark.url)}
                title={bookmark.url}
              >
                {bookmark.name}
              </div>
              <Space size="small">
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => copyToClipboard(bookmark.url)}
                  size="small"
                  className="copy-button"
                  title="Copy URL"
                />
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteBookmark(bookmark.id)}
                  size="small"
                  className="edit-button"
                  danger
                  title="Delete bookmark"
                />
              </Space>
            </div>
          </Card>
        ))}

        {bookmarks.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#999",
              fontSize: "16px",
            }}
          >
            No bookmarks yet. Click "Add Bookmark" to get started!
          </div>
        )}
      </div>

      <Modal
        title="Add New Bookmark"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddBookmark}>
          <Form.Item
            name="name"
            label="Bookmark Name"
            rules={[{ required: true, message: "Please enter bookmark name" }]}
          >
            <Input placeholder="Enter bookmark name" />
          </Form.Item>

          <Form.Item
            name="url"
            label="URL"
            rules={[
              { required: true, message: "Please enter URL" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input placeholder="Enter URL (e.g., https://example.com)" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Bookmark
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookmarkList;
