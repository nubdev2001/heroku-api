const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const socketio = require('socket.io')

app.get('/api',(req,res) => {
    res.json({
        method: 'GET',
        name: "Yuthana Wareesri"
    })
    console.log("New a Get request")
})

app.post('/api',(req,res) => {
    res.json({
        method: 'POST',
        name: "Yuthana Wareesri"
    })
    console.log("New a POST request")
})

const server = app.listen(port,() => {
    console.log("[Server] => Running Now On PORT : ",port)
})

const io = socketio.listen(server);
io.on('connection', client => {
    console.log('user connected')
    client.on('disconnect', () => {
        console.log('user disconnected')
    })
})

app.get('/realtime',(req,res)=>{
    const value = req.query.value;
    io.sockets.emit('value', value)
    res.json({params:value})
})