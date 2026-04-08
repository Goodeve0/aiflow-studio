import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { FlagOutlined } from '@ant-design/icons'
import BaseNode from './BaseNode'

const OutputNode = ({ id, data }: { id: string; data: any }) => {
  return (
    <BaseNode
      id={id}
      label={data.label || '结束'}
      icon={<FlagOutlined />}
      color="#5fd18d"
      width={250}
      tone="terminal"
      summary={data.outputValue ? '已配置最终输出内容' : '等待设置输出内容'}
      badges={[data.outputValue ? '已配置输出' : '待配置', '终点节点']}
    >
      <Handle type="target" position={Position.Left} />
    </BaseNode>
  )
}

export default memo(OutputNode)
