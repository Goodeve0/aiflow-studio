import { useState } from 'react'
import { Layout as AntLayout, Menu, Button, Avatar, Dropdown, Space, Badge, Typography } from 'antd'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  BookOutlined,
  ToolOutlined,
  CodeOutlined,
  ThunderboltOutlined,
  CompassOutlined,
} from '@ant-design/icons'
import { useStore } from '../../store'
import './Layout.css'

const { Header, Sider, Content } = AntLayout
const { Text, Title } = Typography

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { globalConfig, toggleSidebar, user, logout } = useStore()
  const [collapsed, setCollapsed] = useState(globalConfig.sidebarCollapsed)

  const handleToggle = () => {
    setCollapsed(!collapsed)
    toggleSidebar()
  }

  const menuItems = [
    {
      key: '/apps',
      icon: <HomeOutlined />,
      label: '工作台',
    },
    {
      key: '/knowledge-bases',
      icon: <BookOutlined />,
      label: '知识库',
    },
    {
      key: '/tools',
      icon: <ToolOutlined />,
      label: '工具管理',
    },
    {
      key: '/debug',
      icon: <CodeOutlined />,
      label: '调试中心',
    },
  ]

  const userMenu = [
    {
      key: 'profile',
      label: '个人资料',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
    },
  ]

  const routeMeta: Record<string, { title: string; subtitle: string }> = {
    '/apps': {
      title: '应用工作台',
      subtitle: '创建、发布和维护你的 AI 应用。',
    },
    '/knowledge-bases': {
      title: '知识库中枢',
      subtitle: '管理文档、知识库和检索上下文。',
    },
    '/tools': {
      title: '工具与技能',
      subtitle: '集中维护内置工具与自定义能力。',
    },
    '/debug': {
      title: '调试中心',
      subtitle: '验证聊天、工作流和运行结果。',
    },
  }

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout()
      navigate('/login')
    }
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const selectedKey = '/' + (location.pathname.split('/')[1] || 'apps')
  const currentMeta = routeMeta[selectedKey] || {
    title: 'FlowAI Studio',
    subtitle: '统一管理你的 AI 工作流与资源。',
  }

  return (
    <AntLayout className="layout-shell">
      <div className="layout-backdrop" />
      <Sider trigger={null} collapsible collapsed={collapsed} width={268} className="app-sider">
        <div className="brand-panel">
          <div className="brand-mark">
            <ThunderboltOutlined />
          </div>
          {!collapsed && (
            <div className="brand-copy">
              <Title level={4}>FlowAI Studio</Title>
              <Text>AI Orchestration Console</Text>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="nav-intro-card">
            <Text className="nav-intro-label">Workspace</Text>
            <div className="nav-intro-row">
              <CompassOutlined />
              <span>视觉化管理应用、知识库、工具与调试任务</span>
            </div>
          </div>
        )}

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          className="app-menu"
        />
      </Sider>

      <AntLayout className="main-layout">
        <Header className="topbar">
          <div className="topbar-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleToggle}
              className="layout-trigger"
            />
            <div className="topbar-copy">
              <Text className="topbar-label">{selectedKey.replace('/', '').toUpperCase()}</Text>
              <Title level={3}>{currentMeta.title}</Title>
              <Text className="topbar-subtitle">{currentMeta.subtitle}</Text>
            </div>
          </div>

          <div className="topbar-right">
            <Badge status="processing" text="本地开发环境" className="env-badge" />
            <Dropdown menu={{ items: userMenu, onClick: handleUserMenuClick }} trigger={['click']}>
              <button className="user-badge" type="button">
                <Avatar icon={<UserOutlined />} className="user-avatar" />
                <div className="user-copy">
                  <span className="username">{user?.username || '用户'}</span>
                  <span className="user-role">Workspace Owner</span>
                </div>
              </button>
            </Dropdown>
          </div>
        </Header>

        <Content className="page-content">
          <div className="page-surface">
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
