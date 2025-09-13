export interface LocalToolResponse {
  content: Array<{ type: "text"; text: string }>;
  [x: string]: unknown; // Add string index signature
}
