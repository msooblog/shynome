'use strict'

let 	crypto=require('crypto');
const	Port = 500
,		Client = []//用数组是不行的啦！
,		Ws = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'//webSocket,魔法字符串


const   Server = require('net').createServer( ( socket ) => {
	const indexOf = Client.length
	Client.push( socket )
	socket
		.once('data',(data) => {
			let key = data.toString().match(/Sec-WebSocket-Key: (.+)/)
			if( key === null || typeof key[1] !== 'string' )return socket.end();
			let crypto_key = crypto.createHash('sha1').update(key[1]+Ws).digest('base64')

//输出协议时左靠齐,消灭奇怪的缩进符
socket.write(`

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ${crypto_key}

`)

			socket.on('data',(data)=>{console.log(data.toString())})
		})
		.setTimeout( 1000*60 , () => console.log(`客户端${indexOf}一分钟没有活动了`) )
		.on('error',() => console.log(Client.splice(indexOf,1)))
		.on('end',() => console.log(`客户端${indexOf}正在申请关闭连接`))
		.on('close',() => {
			Client.splice(indexOf,1)
			console.log(`客户端${indexOf}已关闭连接并已被删除`)
		})

}).listen( Port , () => console.log(`webSocket is on Port ${Port}`) )

process.stdin.on('data',() => Server.getConnections((error,count)=>{
	if(error)console.log(`获取连接数失败，原因${error}`);
	else console.log(`连接数:${count}`)
}))