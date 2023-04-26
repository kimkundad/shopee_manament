import { Server, OPEN } from 'ws'

const wss = new Server({ port: 3000 })

wss.on('connection', (ws) => {
  console.log('a user connected')
  ws.on('message', (message) => {
    console.log('message:', message)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === OPEN) {
        client.send(message)
      }
    })
  })
})