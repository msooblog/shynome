'use strict'
require('../file/watchDir')(__dirname)//监控整个文件夹

const 	crypto=require('crypto')
,		Client = require('../../array/array.es5.js')//用数组是不行的啦！
,		Ws = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'//webSocket,魔法字符串
let		Port = 500
,		parse = (...rest) => require('./parse')(...rest)
,		toWs  =	(...rest) => require('./toWs')(...rest)


const   Server = require('net').createServer( ( socket ) => {
	const indexOf = Client.push( socket )
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
			//成功后监听数据
			socket.on('data',(data)=>{try{parse(data,socket)}catch(error){console.log(error)}})
		})
		.setTimeout( 1000*60 , () => console.log(`客户端${indexOf}一分钟没有活动了`) )
		.on('error',() => console.log(Client.splice(indexOf,1)))
		.on('end',() => console.log(`客户端${indexOf}正在申请关闭连接`))
		.on('close',() => {
			Client.splice(indexOf,1)
			console.log(`客户端${indexOf}已关闭连接并已被删除`)
		})

}).listen( Port , () => process.title = `webSocket is on Port ${Port}` )

process.stdin.on('data',data => {
	for(let i=0;i<Client.length;i++){
		try{Client[i].write(toWs(data))}catch(error){console.log(error)}
	}})