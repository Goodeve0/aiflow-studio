import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { ToolOutlined } from '@ant-design/icons'
import BaseNode from './BaseNode'

const SkillNode = ({ id, data }: { id: string; data: any }) => {
  const paramCount = data.parameters && typeof data.parameters === 'object' ? Object.keys(data.parameters).length : 0

  return (
    <BaseNode
      id={id}
      label={data.label || '工具调用'}
      icon={<ToolOutlined />}
      color="#22c7d6"
      width={280}
      summary={data.skillId ? '已绑定工具，可执行外部能力或内置方法' : '等待选择工具'}
      badges={[data.skillType === 'custom' ? '自定义工具' : '内置工具', `${paramCount} 个参数`]}
    >
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </BaseNode>
  )
}

export default memo(SkillNode)
