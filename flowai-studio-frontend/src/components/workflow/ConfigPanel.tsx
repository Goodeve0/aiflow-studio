import { useEffect } from 'react'
import { useStore } from '../../store'
import { Form, Input, Select, Slider, Empty, Card, Typography, Tag } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import './ConfigPanel.css'

const { Text } = Typography
const { Option } = Select

const nodeTypeMeta: Record<string, { label: string; hint: string; tone: string }> = {
  start: { label: '开始节点', hint: '定义流程入口与初始变量。', tone: 'blue' },
  userInput: { label: '用户输入', hint: '声明流程需要接收的用户输入字段。', tone: 'green' },
  llm: { label: '大模型', hint: '配置模型、提示词与生成参数。', tone: 'purple' },
  rag: { label: 'RAG 检索', hint: '设置知识库、查询内容与召回数量。', tone: 'gold' },
  skill: { label: '工具节点', hint: '选择工具并配置执行参数。', tone: 'cyan' },
  condition: { label: '条件分支', hint: '基于判断逻辑分流执行路径。', tone: 'red' },
  output: { label: '输出节点', hint: '定义最终返回给用户的结果。', tone: 'green' },
}

const ConfigPanel: React.FC = () => {
  const { selectedNode, updateNodeData } = useStore()
  const [form] = Form.useForm()

  useEffect(() => {
    if (selectedNode) {
      form.setFieldsValue(selectedNode.data)
    } else {
      form.resetFields()
    }
  }, [selectedNode, form])

  const handleValuesChange = (_changedValues: any, allValues: any) => {
    if (selectedNode) {
      updateNodeData(selectedNode.id, allValues)
    }
  }

  const renderConfigForm = () => {
    if (!selectedNode) {
      return (
        <div className="config-panel-empty-state">
          <Empty description="请选择一个节点进行配置" />
          <Text className="config-panel-empty-copy">点击画布中的任意节点后，这里会显示它的配置表单。</Text>
        </div>
      )
    }

    const commonFields = (
      <Form.Item name="label" label="节点名称">
        <Input placeholder="输入节点名称" />
      </Form.Item>
    )

    switch (selectedNode.type) {
      case 'start':
        return (
          <>
            {commonFields}
            <Text type="secondary">此节点为工作流起点，可承载初始变量与全局上下文。</Text>
          </>
        )
      case 'userInput':
        return (
          <>
            {commonFields}
            <Form.Item name="inputField" label="输入字段" rules={[{ required: true }]}> 
              <Input placeholder="例如: question" />
            </Form.Item>
          </>
        )
      case 'llm':
        return (
          <>
            {commonFields}
            <Form.Item name="model" label="模型" initialValue="qwen-turbo">
              <Select>
                <Option value="qwen-turbo">Qwen Turbo</Option>
                <Option value="qwen-plus">Qwen Plus</Option>
              </Select>
            </Form.Item>
            <Form.Item name="systemPrompt" label="系统提示词">
              <Input.TextArea rows={4} placeholder="定义模型的角色和行为" />
            </Form.Item>
            <Form.Item name="userPrompt" label="用户提示词" rules={[{ required: true }]}> 
              <Input.TextArea rows={6} placeholder="输入用户问题，可使用 {{变量}} 引用上下文" />
            </Form.Item>
            <Form.Item name="temperature" label="温度" initialValue={0.7}>
              <Slider min={0} max={1} step={0.1} />
            </Form.Item>
          </>
        )
      case 'rag':
        return (
          <>
            {commonFields}
            <Form.Item name="knowledgeBaseId" label="知识库" rules={[{ required: true }]}> 
              <Select placeholder="选择一个知识库" />
            </Form.Item>
            <Form.Item name="query" label="检索查询" rules={[{ required: true }]}> 
              <Input.TextArea rows={4} placeholder="输入检索内容，可使用 {{变量}}" />
            </Form.Item>
            <Form.Item name="topK" label="Top K" initialValue={5}>
              <Slider min={1} max={10} step={1} />
            </Form.Item>
          </>
        )
      case 'skill':
        return (
          <>
            {commonFields}
            <Form.Item name="skillId" label="选择工具" rules={[{ required: true }]}> 
              <Select placeholder="选择一个内置或自定义工具" />
            </Form.Item>
            <Form.Item label="工具参数 (JSON)">
              <Form.Item name="parameters" noStyle>
                <Input.TextArea rows={6} placeholder='{"param1": "value1"}' />
              </Form.Item>
            </Form.Item>
          </>
        )
      case 'condition':
        return (
          <>
            {commonFields}
            <Text type="secondary">配置分支判断逻辑。</Text>
            <Form.Item name="conditions" label="判断条件 (JSON)">
              <Input.TextArea rows={6} placeholder='[{"variable": "{{llm_1.result}}", "operator": "contains", "value": "yes"}]' />
            </Form.Item>
          </>
        )
      case 'output':
        return (
          <>
            {commonFields}
            <Form.Item name="outputValue" label="输出内容" rules={[{ required: true }]}> 
              <Input.TextArea rows={4} placeholder="最终输出给用户的内容，支持 {{变量}}" />
            </Form.Item>
          </>
        )
      default:
        return <Empty description={`暂不支持 ${selectedNode.type} 节点的配置`} />
    }
  }

  const meta = selectedNode ? nodeTypeMeta[selectedNode.type] : null

  return (
    <Card bordered={false} className="config-panel">
      <div className="config-panel-header">
        <div className="config-panel-title-row">
          <div className="config-panel-mark">
            <SettingOutlined />
          </div>
          <div>
            <h4>节点配置</h4>
            <p>在这里修改当前选中节点的参数与行为。</p>
          </div>
        </div>
        {meta && (
          <div className="config-panel-meta">
            <Tag color={meta.tone}>{meta.label}</Tag>
            <Text>{meta.hint}</Text>
          </div>
        )}
      </div>

      <div className="config-panel-body">
        <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
          {renderConfigForm()}
        </Form>
      </div>
    </Card>
  )
}

export default ConfigPanel
