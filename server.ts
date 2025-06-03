import { WebSocketServer, WebSocket } from 'ws';

const ws = new WebSocketServer({ port: 7173 })
const users = new Set<WebSocket>()

ws.on('connection', (socket) => {
    users.add(socket)

    socket.on('message', (msg: any) => {
        let data
        try {
            data = JSON.parse(msg)
        } catch (error) {
            data = { nombre: "Desconocido", mensaje: "Hubo un error", pfp: 'https://github.com/shadcn.png' }
            console.log(error)
        }
        users.forEach(user => {
            if (user.readyState === WebSocket.OPEN) {
                user.send(JSON.stringify(data))
            }
        })
    })

    socket.on('close', () => {
        users.delete(socket)
    })
})

ws.on('error', (err) => {
    console.log(err)
})

ws.on('listening', () => {
    console.log('Servidor iniciado en ws://localhost:7173')
})