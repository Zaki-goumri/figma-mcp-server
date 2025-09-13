import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: any;
}

export interface ToolHandler {
  execute(args: any): Promise<CallToolResult>;
  validate?(args: any): boolean;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}
