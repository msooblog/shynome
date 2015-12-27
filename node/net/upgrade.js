'use strict'
const	handle={
	websocket:(...r)=>require('./websocket')(...r)
}
module.exports=(req,socket,head)=>{
	let	upgrade=req.headers.upgrade
	if(typeof handle[upgrade]==='function')return handle[upgrade](req,socket,head)
	socket.end(`no handle for ${upgrade}`,'urf8')
}