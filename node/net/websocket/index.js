'use strict'

const 	crypto=require('crypto')
,		Client = require('../../../array/array.es5.js')//用数组是不行的啦！
,		Ws = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'//webSocket,魔法字符串
let		parse = (...r) => require('./parse')(...r)
,		toWs  =	(...r) => require('./toWs')(...r)


module.exports=( req ,socket ) => {
	const indexOf = Client.push( socket )

	let key = req.headers['sec-websocket-key']
	if( key === null || typeof key !== 'string' )return socket.end();
	let crypto_key = crypto.createHash('sha1').update(key+Ws).digest('base64')
	socket.write(`

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ${crypto_key}

`)
	//console.log(socket)
	socket
		.on('data',(data)=>{try{parse(data,socket)}catch(error){console.log(error)}})
		.on('finish',(...r)=>console.log(...r,'finish'))
		.setTimeout(1000*6,()=>console.log(socket.write(toWs('hello'))))
		//.on('timeout',()=>console.log(socket.setTimeout.toString()))
		.on('error',() => console.log(Client.splice(indexOf,1)))
		.on('end',() => console.log(`客户端${indexOf}正在申请关闭连接`))
		.on('close',() => {
			Client.splice(indexOf,1)
			console.log(`客户端${indexOf}已关闭连接并已被删除`)
		})
}