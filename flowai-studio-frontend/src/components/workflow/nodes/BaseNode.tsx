import { memo, ReactNode } from 'react'
import { Typography, Tag } from 'antd'
import {
  LoadingOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleFilled,
} from '@ant-design/icons'
import { useStore } from '../../../store'
import './BaseNode.css'

const { Text } = Typography

interface BaseNodeProps {
  id: string
  label: string
  icon: ReactNode
  children?: ReactNode
  color?: string
  width?: number
  tone?: string
  summary?: string
  badges?: string[]
}

const BaseNode = ({
  id,
  label,
  icon,
  children,
  color = '#d9d9d9',
  width = 240,
  tone = 'default',
  summary,
  badges = [],
}: BaseNodeProps) => {
  const executionState = useStore((state) => state.executionStates[id])
  const status = executionState?.status || 'pending'

  const getStatusMeta = () => {
    switch (status) {
      case 'running':
        return {
          icon: <LoadingOutlined spin />,
          label: '运行中',
          className: 'is-running',
        }
      case 'success':
        return {
          icon: <CheckCircleFilled />,
          label: '成功',
          className: 'is-success',
        }
      case 'failed':
        return {
          icon: <CloseCircleFilled />,
          label: '失败',
          className: 'is-failed',
        }
      default:
        return {
          icon: <ClockCircleFilled />,
          label: '待运行',
          className: 'is-pending',
        }
    }
  }

  const statusMeta = getStatusMeta()

  return (
    <div
      className={`flow-node-card ${statusMeta.className}`}
      style={{ '--node-color': color, width } as React.CSSProperties}
      data-tone={tone}
    >
      <div className="flow-node-card__glow" />
      <div className="flow-node-card__header">
        <div className="flow-node-card__identity">
          <div className="flow-node-card__icon">{icon}</div>
          <div className="flow-node-card__copy">
            <div className="flow-node-card__title-row">
              <Text className="flow-node-card__title">{label}</Text>
              <span className={`flow-node-card__status ${statusMeta.className}`}>
                {statusMeta.icon}
                <span>{statusMeta.label}</span>
              </span>
            </div>
            {summary && <Text className="flow-node-card__summary">{summary}</Text>}
          </div>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="flow-node-card__badges">
          {badges.slice(0, 3).map((badge) => (
            <Tag key={badge} bordered={false} className="flow-node-card__badge">
              {badge}
            </Tag>
          ))}
        </div>
      )}

      <div className="flow-node-card__body">{children}</div>
    </div>
  )
}

export default memo(BaseNode)
