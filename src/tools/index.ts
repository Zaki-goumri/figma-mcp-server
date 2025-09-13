import { Tool } from '@modelcontextprotocol/sdk/types.js';

import { getDocumentTool } from './read-tools/get-document';
import { placeholderTool } from './placeholder-tool';

export const toolDefinitions: Tool[] = [getDocumentTool, placeholderTool];
