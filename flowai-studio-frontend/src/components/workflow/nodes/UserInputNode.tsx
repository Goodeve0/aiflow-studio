import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { MessageOutlined } from '@ant-design/icons'
import BaseNode from './BaseNode'

const UserInputNode = ({ id, data }: { id: string; data: any }) => {
  return (
    <BaseNode
      id={id}
      label={data.label || '用户输入'}
      icon={<MessageOutlined />}
      color="#38c793"
      width={250}
      summary={data.inputField ? `接收字段：${data.inputField}` : '等待配置输入字段'}
      badges={[data.inputField ? '已配置输入字段' : '待配置', '用户交互']}
    >
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </BaseNode>
  )
}

export default memo(UserInputNode)
