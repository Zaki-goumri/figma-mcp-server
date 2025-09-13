import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const placeholderTool: Tool = {
  name: 'placeholder',
  description: 'A placeholder tool',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  execute: async () => {
    return { message: 'This is a placeholder tool.' };
  },
};
