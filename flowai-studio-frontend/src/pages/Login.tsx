import { useState, useEffect } from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Alert,
  Checkbox,
  Space,
  Divider,
  Tag,
} from 'antd'
import {
  LockOutlined,
  UserOutlined,
  ThunderboltOutlined,
  ApiOutlined,
  NodeIndexOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../store'
import './Auth.css'

const { Title, Text } = Typography

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, isLoading, authError, clearError } = useStore()
  const [form] = Form.useForm()
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (authError) {
      setShowError(true)
    }
  }, [authError])

  const handleClearError = () => {
    setShowError(false)
    clearError()
  }

  const getAlertType = () => {
    if (!authError) return 'error'

    switch (authError.type) {
      case 'VALIDATION':
      case 'AUTHENTICATION':
        return 'error'
      case 'LOCKED':
        return 'warning'
      case 'NETWORK':
      case 'SERVER':
        return 'info'
      default:
        return 'error'
    }
  }

  const onSubmit = async (values: { username: string; password: string; remember?: boolean }) => {
    handleClearError()

    try {
      const { username, password } = values
      await login({ username, password })
      navigate('/apps')
    } catch (err: any) {
      console.error('Login error:', err)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-noise" />
      <div className="auth-grid">
        <section className="auth-showcase">
          <Tag bordered={false} className="auth-badge">
            FlowAI Studio / Command Deck
          </Tag>
          <Title level={1} className="auth-hero-title">
            让 AI 工作流像搭控制台一样，顺手、清晰、可调试。
          </Title>
          <Text className="auth-hero-text">
            在一个界面里完成应用编排、知识库检索、模型调试与技能连接，让想法更快落地成可运行的 AI 产品。
          </Text>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <ThunderboltOutlined />
              <span>可视化节点编排，快速搭建复杂流程</span>
            </div>
            <div className="auth-feature-item">
              <ApiOutlined />
              <span>整合模型、技能与外部工具能力</span>
            </div>
            <div className="auth-feature-item">
              <NodeIndexOutlined />
              <span>知识库、RAG 与调试中心协同工作</span>
            </div>
          </div>

          <div className="auth-stats">
            <div>
              <strong>RAG</strong>
              <span>知识增强</span>
            </div>
            <div>
              <strong>MCP</strong>
              <span>工具扩展</span>
            </div>
            <div>
              <strong>SSE</strong>
              <span>流式反馈</span>
            </div>
          </div>
        </section>

        <section className="auth-panel">
          <Card bordered={false} className="auth-card">
            <div className="auth-card-top">
              <div className="auth-brand-mark">
                <SafetyCertificateOutlined />
              </div>
              <div>
                <Text className="auth-eyebrow">欢迎回来</Text>
                <Title level={3} className="auth-title">
                  登录 FlowAI Studio
                </Title>
              </div>
            </div>

            <Text className="auth-subtitle">进入你的 AI 编排工作台，继续管理应用、知识库与工作流。</Text>

            {showError && authError && (
              <Alert
                message={
                  authError.type === 'LOCKED'
                    ? '账户锁定'
                    : authError.type === 'NETWORK'
                      ? '网络错误'
                      : authError.type === 'SERVER'
                        ? '服务器错误'
                        : '登录失败'
                }
                description={
                  <div>
                    <div>{authError.message}</div>
                    {authError.type === 'NETWORK' && (
                      <div className="auth-alert-hint">请检查网络连接或联系管理员</div>
                    )}
                    {authError.type === 'SERVER' && (
                      <div className="auth-alert-hint">服务器暂时不可用，请稍后重试</div>
                    )}
                  </div>
                }
                type={getAlertType()}
                showIcon
                className="auth-alert"
                closable
                onClose={handleClearError}
              />
            )}

            <Form
              form={form}
              onFinish={onSubmit}
              layout="vertical"
              className="auth-form"
              onValuesChange={handleClearError}
            >
              <Form.Item
                name="username"
                label="用户名"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { min: 3, message: '用户名长度至少为3个字符' },
                  { max: 20, message: '用户名长度不能超过20个字符' },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '用户名只能包含字母、数字和下划线',
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="请输入用户名"
                  disabled={isLoading}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="密码"
                rules={[
                  { required: true, message: '请输入密码' },
                  { min: 6, message: '密码长度至少为6个字符' },
                ]}
                validateTrigger="onBlur"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="请输入密码"
                  disabled={isLoading}
                  size="large"
                />
              </Form.Item>

              <div className="auth-form-meta">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox disabled={isLoading}>记住我</Checkbox>
                </Form.Item>
                <Text type="secondary">默认演示账号：admin / admin123</Text>
              </div>

              <Form.Item className="auth-submit-row">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="auth-button"
                  loading={isLoading}
                  disabled={isLoading}
                  block
                  icon={isLoading ? null : <LockOutlined />}
                >
                  {isLoading ? '登录中...' : '进入工作台'}
                </Button>
              </Form.Item>
            </Form>

            <Divider className="auth-divider">
              <Text type="secondary">新的使用者</Text>
            </Divider>

            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              <Text className="auth-link">
                还没有账号？ <Link to="/register">创建一个新账号</Link>
              </Text>
              <Text className="auth-muted-note">忘记密码请联系系统管理员重置访问权限。</Text>
            </Space>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default Login
