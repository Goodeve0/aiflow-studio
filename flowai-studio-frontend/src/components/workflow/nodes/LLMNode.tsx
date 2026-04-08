import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { RobotOutlined } from '@ant-design/icons'
import BaseNode from './BaseNode'

const LLMNode = ({ id, data }: { id: string; data: any }) => {
  const badges = [data.model || '未选模型']
  if (typeof data.temperature === 'number') {
    badges.push(`温度 ${data.temperature}`)
  }

  return (
    <BaseNode
      id={id}
      label={data.label || '大语言模型'}
      icon={<RobotOutlined />}
      color="#8b5cf6"
      width={280}
      summary={data.userPrompt ? '已配置提示词与模型参数' : '等待填写提示词内容'}
      badges={badges}
    >
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </BaseNode>
  )
}

export default memo(LLMNode)
