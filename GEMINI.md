# Context: Figma MCP Server

## Goal

Build an **MCP server** that connects AI (Gemini CLI, Cursor, etc.) to **Figma API**.  
The server should allow both:

1. **Reading designs** (documents, nodes).
2. **Creating designs** (frames, text, shapes, wireframes).

---

## Architecture

- **Server class** (`src/server/mcp-server.ts`)
  - Uses `McpServer` from `@modelcontextprotocol/sdk/server/mcp.js`.
  - Transports:
    - **StdioServerTransport** → for Gemini CLI.
    - **WebSocketServerTransport** → for plugins (Figma, Cursor).

- **Tools** (`src/tools/`)
  - Tools are registered at server startup.
  - Each tool has:
    - `name`
    - `description`
    - `inputSchema` (Zod)
    - `handler` (executes logic, returns result).

- **Figma Service** (`src/services/figma-api.ts`)
  - Wraps REST calls to Figma API using **Personal Access Token (PAT)**.
  - Later: extend with OAuth2 for multi-user support.

---

## Current Tools

- **getDocument**  
  Input: `{ fileKey }`  
  → Returns Figma document JSON.

- **(Planned)** getNode  
  Input: `{ fileKey, nodeId }`  
  → Returns specific node.

---

## Creation Tools (Planned / In Progress)

- **createFrame**  
  Input: `{ fileKey, name, width, height }`  
  → Creates a frame in the document.

- **createText**  
  Input: `{ fileKey, parentNodeId, content, fontSize }`  
  → Creates a text node in a frame.

- **createRectangle**  
  Input: `{ fileKey, parentNodeId, width, height }`  
  → Creates a rectangle shape.

- **generateWireframe (AI-assisted)**  
  Input: `{ fileKey, prompt }`  
  → Uses AI to generate a wireframe layout and push nodes to Figma.

---

## Usage Modes

- **Gemini CLI (Stdio)**  
  Used for local dev / AI pair programming.

- **WebSocket server**  
  For long-lived integration (e.g., Figma plugin, Cursor).

---

## Roadmap / TODO

- [ ] Finish OOP server setup (MCPServer class).
- [ ] Define base `Tool` typings (avoid passing `undefined` config).
- [ ] Implement `createFrame`, `createText`.
- [ ] Implement Figma API wrapper (`GET /files/:fileKey`, `POST /v1/files/...`).
- [ ] Add better error handling for missing config.
- [ ] Extend with AI-driven workflows (wireframe from prompt).
- [ ] Migrate from PAT → OAuth2 for multi-user.

---

## Notes for Gemini CLI

- Always suggest **typed Zod schemas** for input/output of tools.
- Help with **Figma REST API integration**.
- Help with **WebSocket transport** setup.
- Keep context of both **reading tools** and **design creation tools**.
- Remind me to document new tools in this file whenever they are added.
