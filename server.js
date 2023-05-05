const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

const rooms = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'joinRoom') {
      const room = data.room;
      if (!rooms[room]) {
        rooms[room] = [];
      }
      rooms[room].push(ws);
      console.log(`User joined room ${room}`);
    } else if (data.type === 'message') {
      const room = data.room;
      console.log('1');
      if (rooms[room]) {
        console.log('2');
        console.log(rooms[room])
        rooms[room].forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            console.log('3');
            client.send(JSON.stringify(data));
          }
        });
      }
    }
  });

  ws.on('close', () => {
    // remove user from room
    Object.keys(rooms).forEach((room) => {
      rooms[room] = rooms[room].filter((client) => client !== ws);
    });
  });
});
