import { INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'
import { AIPluginTool } from 'langchain/tools'

class OpenAPITools implements INode {
  label: string
  name: string
  description: string
  type: string
  icon: string
  category: string
  baseClasses: string[]
  inputs: INodeParams[]

  constructor() {
    this.label = 'OpenAPI Tool'
    this.name = 'openapi'
    this.type = 'OpenAPI'
    this.icon = 'openapi.png'
    this.category = 'Tools'
    this.description = 'Wrapper around OpenAPI tool - a tool for generating OpenAPI specifications for APIs'
    this.inputs = [
      {
        label: 'API Specification',
        name: 'apiSpec',
        type: 'string',
      },
    ]
    this.baseClasses = [this.type, ...getBaseClasses(AIPluginTool)]
  }

  async init(nodeData: INodeData): Promise<any> {
    const apiSpec = nodeData.inputs?.apiSpec as string

    const toolParams: AIPluginToolParams = {
      name: 'OpenAPI Tool',
      description: 'This tool generates an OpenAPI specification for an API',
      apiSpec: apiSpec,
    }

    return new AIPluginTool(toolParams)
  }
}

module.exports = { nodeClass: OpenAPITools }
