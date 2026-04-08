import { useCallback } from 'react'
import {
  PlayCircleOutlined,
  UserOutlined,
  MessageOutlined,
  BookOutlined,
  ToolOutlined,
  BranchesOutlined,
  ExportOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import './NodePanel.css'

interface NodeType {
  type: string
  label: string
  icon: React.ReactNode
  color: string
  hint: string
}

const nodeTypes: NodeType[] = [
  { type: 'start', label: '开始', icon: <PlayCircleOutlined />, color: '#5b8cff', hint: '定义流程入口与初始变量' },
  { type: 'userInput', label: '用户输入', icon: <UserOutlined />, color: '#38c793', hint: '收集用户问题与表单内容' },
  { type: 'llm', label: '大模型', icon: <MessageOutlined />, color: '#8b5cf6', hint: '编写提示词并调用模型生成' },
  { type: 'rag', label: 'RAG 检索', icon: <BookOutlined />, color: '#f59e0b', hint: '从知识库召回相关上下文' },
  { type: 'skill', label: '工具', icon: <ToolOutlined />, color: '#22c7d6', hint: '调用内置或自定义工具能力' },
  { type: 'condition', label: '条件分支', icon: <BranchesOutlined />, color: '#ff667d', hint: '基于判断结果切换执行路径' },
  { type: 'output', label: '输出', icon: <ExportOutlined />, color: '#5fd18d', hint: '输出最终结果给用户或下游' },
]

const NodePanel: React.FC = () => {
  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'copy'
  }, [])

  return (
    <aside className="node-panel">
      <div className="node-panel-header">
        <div className="node-panel-badge">
          <ThunderboltOutlined />
          <span>Node Library</span>
        </div>
        <h3>节点库</h3>
        <p>拖拽节点到画布，快速搭建一条可运行的 AI 工作流。</p>
      </div>

      <div className="node-panel-content">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            className="node-item"
            draggable
            onDragStart={(e) => onDragStart(e, nodeType.type)}
            style={{ '--node-accent': nodeType.color } as React.CSSProperties}
          >
            <div className="node-item-icon">{nodeType.icon}</div>
            <div className="node-item-copy">
              <div className="node-item-label">{nodeType.label}</div>
              <div className="node-item-hint">{nodeType.hint}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default NodePanel
