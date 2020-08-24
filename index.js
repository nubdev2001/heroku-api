const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.get('/api',(req,res) => {
    res.json({
        method: 'GET',
        name: "Yuthana Wareesri"
    })
})

app.post('/api',(req,res) => {
    res.json({
        method: 'POST',
        name: "Yuthana Wareesri"
    })
})

app.listen(port,() => {
    console.log("[Server] => Running Now")
})