'use strict'
//node --harmony_rest_parameters shynome/node/net
require('../file/watchDir')(__dirname)//监控整个文件夹

const	Port=80
,		Server=require('http').createServer().listen(Port,()=>process.title=`服务器运行在127.0.0.1:${Port}`)

let		route=(...rest)=>require('./route')(...rest)
,		upgrade=(...rest)=>require('./upgrade')(...rest)

Server
	.on('request',route)
	.on('upgrade',upgrade)


process.on('uncaughtException',(...rest)=>console.log(...rest))