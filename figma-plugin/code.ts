/// <reference types="@figma/plugin-typings" />

const WS_URL = 'ws://localhost:3055';
let ws: WebSocket | null = null;

function sendConnectionStatus(status: string) {
  figma.ui.postMessage({ type: 'connection-status', data: { status } });
}

function connectWebSocket() {
  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log('Figma Plugin: Connected to WebSocket server');
    sendConnectionStatus('Connected');
    ws?.send(JSON.stringify({ type: 'join', channel: 'figma' }));
  };

  ws.onmessage = async (event) => {
    try {
      const data = JSON.parse(event.data as string);
      if (data.type === 'broadcast' && data.message) {
        const { jsonrpc, id, method, params, result, error } = data.message;

        // Handle responses from MCP server
        if (id) {
          if (result) {
            console.log('Figma Plugin: Received result from MCP server', result);
            figma.ui.postMessage({ type: 'command-result', data: result });
          } else if (error) {
            console.error('Figma Plugin: Received error from MCP server', error);
            figma.ui.postMessage({ type: 'command-error', data: error });
          }
        } else if (method === 'create_frame') {
          console.log('Figma Plugin: Received create_frame command from MCP server', params);
        }
      }
    } catch (error) {
      console.error('Figma Plugin: Error parsing message or executing command', error);
      figma.ui.postMessage({ type: 'command-error', data: { message: 'Error parsing message or executing command' } });
    }
  };

  ws.onclose = () => {
    console.log('Figma Plugin: Disconnected from WebSocket server. Reconnecting in 2 seconds...');
    sendConnectionStatus('Disconnected');
    setTimeout(connectWebSocket, 2000);
  };

  ws.onerror = (err) => {
    console.error('Figma Plugin: WebSocket error', err);
    sendConnectionStatus('Error');
  };
}

// Initial connection
connectWebSocket();

// Listen for messages from UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-frame') {
    const jsonRpcRequest = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'create_frame',
      params: msg.data,
    };
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'message', channel: 'figma', message: jsonRpcRequest }));
      console.log('Figma Plugin: Sent create_frame command to MCP server', jsonRpcRequest);
      figma.ui.postMessage({ type: 'command-status', data: { message: 'Command sent to MCP server...' } });
    } else {
      figma.ui.postMessage({ type: 'command-error', data: { message: 'Not connected to MCP server.' } });
    }
  } else if (msg.type === 'get-connection-status') {
    if (ws && ws.readyState === WebSocket.OPEN) {
      sendConnectionStatus('Connected');
    } else if (ws && ws.readyState === WebSocket.CONNECTING) {
      sendConnectionStatus('Connecting...');
    } else {
      sendConnectionStatus('Disconnected');
    }
  }
  else if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.ui.postMessage({ type: 'create-rectangles', message: `Created ${msg.count} Rectangles` });
  }
};