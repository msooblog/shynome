'use strict'
const 	Port = 2233
let 	client=[]
require('net').createServer( (socket) => {
	const indexOf=client.length
	client.push(socket)
	console.log(`有${indexOf+1}个连接`)
	socket
		.on('end',(e) => {client.splice(indexOf,1);console.log(`失去了一个连接,现在还有${client.length}个连接`)} )
		.on('error',() => {client.splice(indexOf,1);console.log(`失去了一个连接,现在还有${client.length}个连接`)} )
		.on('data',(data) => console.log(data.toString()) )
}).listen(Port,() => {console.log(`服务器运行在${Port}端口`)})

process.stdin.on('data',(data)=>{
	client.forEach((e)=>e.write(data))	
})