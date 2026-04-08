import { useState } from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Alert,
  Space,
  Divider,
  Tag,
  message,
} from 'antd'
import {
  LockOutlined,
  UserOutlined,
  RocketOutlined,
  BranchesOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../store'
import './Auth.css'

const { Title, Text } = Typography

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { register, isLoading } = useStore()
  const [form] = Form.useForm()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (values: { username: string; password: string; confirmPassword: string }) => {
    setError(null)
    try {
      const { username, password } = values
      await register({ username, password })
      message.success('注册成功，请登录')
      navigate('/login')
    } catch (err: any) {
      setError(err?.message || err?.response?.data?.message || '注册失败，请检查输入信息')
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-noise" />
      <div className="auth-grid auth-grid-register">
        <section className="auth-showcase auth-showcase-register">
          <Tag bordered={false} className="auth-badge auth-badge-register">
            FlowAI Studio / New Operator
          </Tag>
          <Title level={1} className="auth-hero-title">
            创建账号，开始搭建属于你的 AI 应用控制台。
          </Title>
          <Text className="auth-hero-text">
            从第一个聊天应用，到带知识库和工具调用的复杂工作流，都可以在这里逐步搭出来。
          </Text>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <RocketOutlined />
              <span>快速创建应用与演示工作流</span>
            </div>
            <div className="auth-feature-item">
              <BranchesOutlined />
              <span>拖拽式分支逻辑与节点执行链路</span>
            </div>
            <div className="auth-feature-item">
              <DatabaseOutlined />
              <span>把文档接入知识库，获得更准的上下文</span>
            </div>
          </div>

          <div className="auth-checklist">
            <div><CheckCircleOutlined /> 默认体验数据可直接开始测试</div>
            <div><CheckCircleOutlined /> 支持后续扩展模型与工具节点</div>
            <div><CheckCircleOutlined /> 注册后即可进入统一工作台</div>
          </div>
        </section>

        <section className="auth-panel">
          <Card bordered={false} className="auth-card">
            <div className="auth-card-top">
              <div className="auth-brand-mark auth-brand-mark-register">
                <RocketOutlined />
              </div>
              <div>
                <Text className="auth-eyebrow">创建账号</Text>
                <Title level={3} className="auth-title">
                  加入 FlowAI Studio
                </Title>
              </div>
            </div>

            <Text className="auth-subtitle">注册后即可开始管理应用、工作流编排与知识库检索体验。</Text>

            {error && (
              <Alert
                message="注册失败"
                description={error}
                type="error"
                showIcon
                className="auth-alert"
              />
            )}

            <Form form={form} onFinish={onSubmit} layout="vertical" className="auth-form">
              <Form.Item
                name="username"
                label="用户名"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { min: 3, message: '用户名长度至少为3个字符' },
                  { max: 20, message: '用户名长度不能超过20个字符' },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="设置你的用户名" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="密码"
                rules={[
                  { required: true, message: '请输入密码' },
                  { min: 6, message: '密码长度至少为6个字符' },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="设置登录密码" size="large" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="确认密码"
                dependencies={['password']}
                rules={[
                  { required: true, message: '请确认密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('两次输入的密码不一致'))
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="再次输入密码" size="large" />
              </Form.Item>

              <Form.Item className="auth-submit-row">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="auth-button auth-button-register"
                  loading={isLoading}
                  block
                  icon={isLoading ? null : <RocketOutlined />}
                >
                  {isLoading ? '注册中...' : '创建并开始'}
                </Button>
              </Form.Item>
            </Form>

            <Divider className="auth-divider">
              <Text type="secondary">已经有账号</Text>
            </Divider>

            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              <Text className="auth-link">
                已有账号？ <Link to="/login">返回登录</Link>
              </Text>
              <Text className="auth-muted-note">建议使用易记的用户名，方便后续在团队环境中识别。</Text>
            </Space>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default Register
