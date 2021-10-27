const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const socketio = require('socket.io')
var mysql = require('mysql');


var connection = mysql.createConnection({
    host     : '85.10.205.173',
    user     : 'nubdev2001',
    password : '',
    database : 'nubdev_project'
})

connection.connect();

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
    connection.query(`SELECT * FROM setting`, function (error, results, fields) {
        console.log(results)
	});
    io.sockets.emit('value', value)
    res.json({params:value})
})

app.get('/status',(req,res)=>{
	connection.query(`SELECT * FROM setting WHERE text = "status"`, function (error, results, fields) {
		if(results){
			var status = results[0]['value'];
			if(status == "on"){
				io.emit('status','off')
				connection.query("UPDATE setting SET value='off' WHERE text = 'status'")
			}else{
				io.emit('status','on')
				connection.query("UPDATE setting SET value='on' WHERE text = 'status'")
			}
		}
	  });
	res.json({status: "success",msg: "บันทึสำเร็จ"})
})

app.get('/get_status',(req,res)=>{
	connection.query(`SELECT * FROM setting WHERE text = "status"`, (error, results, fields) => {
		res.json({status: results[0]['value']})
	})
})

app.post('/post',(req,res) => {
    res.send("Success");
    console.log(req);
})
