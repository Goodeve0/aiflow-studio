import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { PlayCircleOutlined } from '@ant-design/icons'
import BaseNode from './BaseNode'

const StartNode = ({ id, data }: { id: string; data: any }) => {
  const variableCount = Array.isArray(data.variables) ? data.variables.length : 0

  return (
    <BaseNode
      id={id}
      label={data.label || '开始'}
      icon={<PlayCircleOutlined />}
      color="#5b8cff"
      width={240}
      tone="start"
      summary="流程入口，用来定义起始变量与初始化上下文。"
      badges={[variableCount > 0 ? `${variableCount} 个变量` : '无初始变量', '入口节点']}
    >
      <Handle type="source" position={Position.Right} />
    </BaseNode>
  )
}

export default memo(StartNode)
