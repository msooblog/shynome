'use strict'
const	url=require('url')
,		handle={
	'/cdn': (...r)=>require('../file/file.js')(__dirname)(...r)
}
module.exports=(req,res)=>{
	return handle['/cdn'](req,res,url.parse(req.url).pathname)
	//只分发文件资源，不做其他处理
	let pathname	=	url.parse(req.url).pathname
	,	func		=	pathname.split('/')[1]
	console.log(pathname.slice((func.length+1)))
	if( handle[func] && typeof require(handle[func]) === "function"){
		require(handle[func])(req,res,pathname.slice((func.length+1)))
	}else	require(handle['/file'])(req,res,'/404');
}