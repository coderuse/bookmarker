import { Typography, List, Card, Row, Col, Tag, Button } from 'antd'
import { CheckCircleOutlined, CodeOutlined, ApiOutlined, ThunderboltOutlined, HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

const About = () => {
  const technologies = [
    'React 18 with TypeScript',
    'React Router for navigation',
    'Google Drive API for cloud sync',
    'Ant Design for UI components',
    'Vite for fast development and building',
    'ESLint for code quality'
  ]

  const features = [
    'Personal bookmark management',
    'Google Drive synchronization',
    'Cross-device bookmark access',
    'Offline support with local storage',
    'OAuth2 authentication',
    'Private app data folder',
    'Responsive design'
  ]

  return (
    <div style={{ padding: '24px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
        <Link to="/">
          <Button type="primary" icon={<HomeOutlined />}>
            Back to Bookmarks
          </Button>
        </Link>
      </div>

      <Title level={1}>
        <CodeOutlined /> About Bookmarker
      </Title>
      <Paragraph>
        A modern bookmark manager with Google Drive synchronization. Keep your bookmarks organized and accessible across all your devices.
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card 
            title={<><ApiOutlined /> Technologies</>}
            size="small"
          >
            <List
              size="small"
              dataSource={technologies}
              renderItem={item => (
                <List.Item>
                  <Tag color="blue">{item}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card 
            title={<><ThunderboltOutlined /> Features</>}
            size="small"
          >
            <List
              size="small"
              dataSource={features}
              renderItem={item => (
                <List.Item>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '24px' }} title="How to Get Started">
        <Paragraph>
          1. <strong>Sign in with Google:</strong> Click the "Sign in with Google" button to enable cloud synchronization
        </Paragraph>
        <Paragraph>
          2. <strong>Add Bookmarks:</strong> Use the "Add Bookmark" button to save your favorite websites
        </Paragraph>
        <Paragraph>
          3. <strong>Manage Bookmarks:</strong> Copy URLs or delete bookmarks with the action buttons
        </Paragraph>
        <Paragraph>
          4. <strong>Cross-Device Access:</strong> Your bookmarks will automatically sync across all your devices
        </Paragraph>
      </Card>
    </div>
  )
}

export default About