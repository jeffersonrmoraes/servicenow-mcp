/**
 * ServiceNow MCP v5.0 — Central Type Definitions
 */

export interface ServiceNowContext {
  instance: string;
  user: string;
  headers: Record<string, string>;
}

export interface ClientResult<T = any> {
  result: T;
  meta?: {
    offset: number;
    limit: number;
    count: number;
  };
}

export type ServiceNowEnv = string | null;

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ToolHandler {
  (name: string, args: any): Promise<any>;
}

export interface MCPResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}
