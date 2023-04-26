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
    this.icon = 'serpapi.png'
    this.category = 'Tools'
    this.description = 'Wrapper around OpenAPI tool - a tool for generating OpenAPI specifications for APIs'
    this.inputs = [
      {
        label: 'API Specification URL',
        name: 'apiSpecUrl',
        type: 'string',
      },
    ]
    this.baseClasses = [this.type, ...getBaseClasses(AIPluginTool)]
  }

  async init(nodeData: INodeData): Promise<any> {
    const apiSpecUrl = nodeData.inputs?.apiSpecUrl as string
    return AIPluginTool.fromPluginUrl(apiSpecUrl)
  }
}

module.exports = { nodeClass: OpenAPITools }
