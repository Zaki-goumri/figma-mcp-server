import { WebSocketServer, WebSocket } from 'ws';

const channels = new Map<string, Set<WebSocket>>();

const wss = new WebSocketServer({ port: 3055 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'join') {
        const channelName = data.channel;
        if (!channelName || typeof channelName !== 'string') {
          ws.send(JSON.stringify({ type: 'error', message: 'Channel name is required' }));
          return;
        }

        if (!channels.has(channelName)) {
          channels.set(channelName, new Set());
        }

        const channelClients = channels.get(channelName)!;
        channelClients.add(ws);

        ws.send(JSON.stringify({ type: 'system', message: `Joined channel: ${channelName}` }));

        channelClients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'system', message: 'A new user has joined the channel' }));
          }
        });
        return;
      }

      if (data.type === 'message') {
        const channelName = data.channel;
        if (!channelName || typeof channelName !== 'string') {
          ws.send(JSON.stringify({ type: 'error', message: 'Channel name is required' }));
          return;
        }

        const channelClients = channels.get(channelName);
        if (!channelClients || !channelClients.has(ws)) {
          ws.send(JSON.stringify({ type: 'error', message: 'You must join the channel first' }));
          return;
        }

        channelClients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'broadcast', message: data.message, sender: client === ws ? 'You' : 'User' }));
          }
        });
      }
    } catch (err) {
      console.error('Error handling message:', err);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    channels.forEach((clients) => {
      clients.delete(ws);
    });
  });
});

console.log('WebSocket server running on port 3055');