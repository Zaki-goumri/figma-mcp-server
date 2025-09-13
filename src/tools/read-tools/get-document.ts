import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { FigmaAPI } from '../../services/figma-api';
import { FigmaFileKeySchema, validateInput } from '../../utils/validation';

const figmaApi = new FigmaAPI(process.env.FIGMA_TOKEN || '');

async function getDocument(input: { fileKey: string }): Promise<any> {
  const fileKey = validateInput(FigmaFileKeySchema, input.fileKey);
  return figmaApi.getDocument(fileKey);
}

export const getDocumentTool: Tool = {
  name: 'getDocument',
  description: 'Get a Figma document by its file key',
  inputSchema: {
    type: 'object',
    properties: {
      fileKey: {
        type: 'string',
        description: 'The file key of the Figma document',
      },
    },
    required: ['fileKey'],
  },
  execute: async ({ fileKey }: { fileKey: string }) => {
    return getDocument({ fileKey });
  },
};
