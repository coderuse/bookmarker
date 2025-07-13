import { Typography, List, Card, Row, Col, Button, Space, Divider } from "antd";
import {
  CheckCircleOutlined,
  BookOutlined,
  CloudOutlined,
  SafetyOutlined,
  HomeOutlined,
  HeartOutlined,
  GlobalOutlined,
  TabletOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const About = () => {
  const coreFeatures = [
    "Unlimited bookmarks - completely free forever",
    "Tab-based organization for easy categorization",
    "Google Drive sync for cross-device access",
    "Works offline with local storage backup",
    "Clean, ad-free interface",
    "No registration required - just sign in with Google",
  ];

  const organizationFeatures = [
    "Create multiple tabs (Work, Personal, Learning, etc.)",
    "Add unlimited bookmarks in each tab",
    "Copy URLs with one click",
    "Delete bookmarks easily",
    "Responsive design for all devices",
    "Fast search and navigation",
  ];

  const privacyFeatures = [
    "Your data stays in your Google Drive",
    "Private app folder - only you can access",
    "No tracking or analytics",
    "No ads or monetization",
    "Secure OAuth2 authentication",
    "Local storage fallback for privacy",
  ];

  return (
    <div
      style={{
        padding: "24px",
        position: "relative",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div style={{ position: "absolute", top: "24px", right: "24px" }}>
        <Link to="/">
          <Button type="primary" icon={<HomeOutlined />}>
            Back to Bookmarks
          </Button>
        </Link>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title level={1}>
          <BookOutlined /> About Bookmarker
        </Title>
        <Title level={3} style={{ color: "#1890ff", fontWeight: "normal" }}>
          Free Online Bookmark Manager
        </Title>
        <Paragraph
          style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}
        >
          A modern, free bookmark manager that helps you organize your favorite
          websites with tabs and sync them across all your devices using Google
          Drive. Always free, no ads, no limits.
        </Paragraph>
      </div>

      <Card
        style={{
          marginBottom: "24px",
          background: "#f6ffed",
          borderColor: "#b7eb8f",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <HeartOutlined
            style={{ fontSize: "24px", color: "#52c41a", marginRight: "8px" }}
          />
          <strong style={{ fontSize: "18px", color: "#389e0d" }}>
            100% Free Forever - No Subscription, No Ads, No Limits
          </strong>
        </div>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card
            title={
              <>
                <BookOutlined style={{ color: "#1890ff" }} /> Core Features
              </>
            }
            style={{ height: "100%" }}
          >
            <List
              size="small"
              dataSource={coreFeatures}
              renderItem={(item) => (
                <List.Item style={{ padding: "8px 0", border: "none" }}>
                  <CheckCircleOutlined
                    style={{
                      color: "#52c41a",
                      marginRight: 8,
                      fontSize: "16px",
                    }}
                  />
                  <span>{item}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <>
                <TabletOutlined style={{ color: "#722ed1" }} /> Organization
              </>
            }
            style={{ height: "100%" }}
          >
            <List
              size="small"
              dataSource={organizationFeatures}
              renderItem={(item) => (
                <List.Item style={{ padding: "8px 0", border: "none" }}>
                  <CheckCircleOutlined
                    style={{
                      color: "#52c41a",
                      marginRight: 8,
                      fontSize: "16px",
                    }}
                  />
                  <span>{item}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <>
                <SafetyOutlined style={{ color: "#fa541c" }} /> Privacy &
                Security
              </>
            }
            style={{ height: "100%" }}
          >
            <List
              size="small"
              dataSource={privacyFeatures}
              renderItem={(item) => (
                <List.Item style={{ padding: "8px 0", border: "none" }}>
                  <CheckCircleOutlined
                    style={{
                      color: "#52c41a",
                      marginRight: 8,
                      fontSize: "16px",
                    }}
                  />
                  <span>{item}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Divider style={{ margin: "40px 0" }} />

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <CloudOutlined style={{ color: "#13c2c2" }} /> How to Get
                Started
              </>
            }
          >
            <div style={{ lineHeight: "1.8" }}>
              <Paragraph>
                <strong>1. Sign in with Google:</strong> Click the "Sign in with
                Google" button to enable cloud synchronization and access your
                bookmarks from anywhere.
              </Paragraph>
              <Paragraph>
                <strong>2. Create Tabs:</strong> Organize your bookmarks by
                creating tabs like "Work", "Personal", "Learning", etc.
              </Paragraph>
              <Paragraph>
                <strong>3. Add Bookmarks:</strong> Use the "Add Bookmark" button
                to save your favorite websites in the appropriate tab.
              </Paragraph>
              <Paragraph>
                <strong>4. Access Everywhere:</strong> Your bookmarks
                automatically sync across all your devices - desktop, tablet,
                and mobile.
              </Paragraph>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <GlobalOutlined style={{ color: "#eb2f96" }} /> Why Choose
                Bookmarker?
              </>
            }
          >
            <div style={{ lineHeight: "1.8" }}>
              <Paragraph>
                <strong>✅ Always Free:</strong> No subscription fees, premium
                tiers, or hidden costs. Free forever.
              </Paragraph>
              <Paragraph>
                <strong>✅ No Ads:</strong> Clean, distraction-free interface
                focused on your bookmarks.
              </Paragraph>
              <Paragraph>
                <strong>✅ Privacy First:</strong> Your data stays in your
                Google Drive. We don't see or store your bookmarks.
              </Paragraph>
              <Paragraph>
                <strong>✅ Simple & Fast:</strong> Easy to use interface that
                loads quickly and works on all devices.
              </Paragraph>
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        style={{
          marginTop: "32px",
          textAlign: "center",
          background: "#f0f5ff",
          borderColor: "#adc6ff",
        }}
      >
        <Title level={4} style={{ color: "#1890ff", marginBottom: "16px" }}>
          Start Organizing Your Bookmarks Today
        </Title>
        <Paragraph style={{ marginBottom: "20px", fontSize: "16px" }}>
          Join thousands of users who have simplified their bookmark management
          with our free tool.
        </Paragraph>
        <Space>
          <Link to="/">
            <Button type="primary" size="large" icon={<BookOutlined />}>
              Start Using Bookmarker
            </Button>
          </Link>
        </Space>
      </Card>

      <div style={{ textAlign: "center", marginTop: "40px", color: "#8c8c8c" }}>
        <Paragraph style={{ fontSize: "14px" }}>
          Open source project released under MIT License |
          <a
            href="https://github.com/coderuse/bookmarker"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "8px" }}
          >
            <GithubOutlined style={{ marginRight: "4px", color: "#545050ff" }} />
          </a>
        </Paragraph>
      </div>
    </div>
  );
};

export default About;
