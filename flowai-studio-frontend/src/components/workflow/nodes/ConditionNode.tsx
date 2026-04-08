import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { ApartmentOutlined } from '@ant-design/icons'
import BaseNode from './BaseNode'

const ConditionNode = ({ id, data }: { id: string; data: any }) => {
  const conditionCount = Array.isArray(data.conditions) ? data.conditions.length : 0

  return (
    <BaseNode
      id={id}
      label={data.label || '条件分支'}
      icon={<ApartmentOutlined />}
      color="#ff667d"
      width={260}
      summary={conditionCount > 0 ? '根据判断结果切换流程分支' : '等待配置判断逻辑'}
      badges={[conditionCount > 0 ? `${conditionCount} 条规则` : '无规则', 'True / False 分流']}
    >
      <Handle type="source" position={Position.Right} id="true" style={{ top: '34%' }} />
      <Handle type="source" position={Position.Right} id="false" style={{ top: '72%' }} />
      <Handle type="target" position={Position.Left} />
    </BaseNode>
  )
}

export default memo(ConditionNode)
