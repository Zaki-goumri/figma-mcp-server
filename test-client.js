const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3055');

ws.on('open', function open() {
  console.log('Connected to WebSocket server');

  // Join the figma channel
  const joinMessage = {
    type: 'join',
    channel: 'figma'
  };
  ws.send(JSON.stringify(joinMessage));
  console.log('Sent join message:', joinMessage);
});

ws.on('message', function incoming(data) {
  const message = JSON.parse(data);
  console.log('Received message:', message);

  // If we have successfully joined the channel, send the tool execution request
  if (message.type === 'system' && message.message.startsWith('Joined channel')) {
    const toolRequest = {
      type: 'message',
      channel: 'figma',
      message: {
        jsonrpc: '2.0',
        method: 'get_document_info',
        id: 1
      }
    };
    ws.send(JSON.stringify(toolRequest));
    console.log('Sent tool request:', toolRequest);
  }
});

ws.on('close', function close() {
  console.log('Disconnected from WebSocket server');
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});
