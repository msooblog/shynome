'use strict'
	let client=require('net').connect({port : 2233},()=>console.log('连接服务器成功'))
	client
	.on('data',(data) => console.log(data.toString()) )
	.on('end',() => console.log('连接中断'))
	.on('error',() => console.log('意外错误'))

process.stdin.on('data',(data)=>client.write(data))