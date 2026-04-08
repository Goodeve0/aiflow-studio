import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { ReadOutlined } from '@ant-design/icons'
import BaseNode from './BaseNode'

const RAGNode = ({ id, data }: { id: string; data: any }) => {
  return (
    <BaseNode
      id={id}
      label={data.label || '知识库检索'}
      icon={<ReadOutlined />}
      color="#f59e0b"
      width={280}
      summary={data.query ? '已配置检索查询与召回参数' : '等待设置知识库与查询语句'}
      badges={[data.knowledgeBaseId ? '已绑定知识库' : '未绑定知识库', `TopK ${data.topK ?? 3}`]}
    >
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </BaseNode>
  )
}

export default memo(RAGNode)
