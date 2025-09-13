export interface Config {
  figma: {
    token: string;
    rateLimitPerMinute: number;
    timeoutMs: number;
  };
  cache: {
    enabled: boolean;
    ttlSeconds: number;
    maxSize: number;
  };
  features: {
    aiAnalysis: boolean;
    pluginSupport: boolean;
    batchOperations: boolean;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    file?: string;
  };
}

export interface ToolResponse {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: {
    executionTime: number;
    cached: boolean;
  };
}
