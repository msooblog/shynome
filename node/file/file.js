'use strict'
//var file=require(file)(path)
//file(req,res,pathname)
//res.write(path+pathname)

let	fs			=	require('fs')
,	path		=	require('path')
,	fileType	=	() => require('./fileType.json')

module.exports	=	( root ) => {
return function (req,res,pathname){
	let content	=	fileType()[path.extname(pathname)]
	if( content && typeof pathname	===	'string' ){
		if(!content['encode'])content['encode']	=	'utf8';
		pathname	=	path.join(root,pathname)
		fs.readFile(pathname,content['encode'],function(err,data){
			if(err){
				res.writeHead(500,{'Content-Type':'text/plain;charset=utf-8'})
				res.end(pathname+'失败')
			}else{
				res.writeHead(200,{
					'Content-Type':content['type']+';charset='+content['encode']
					,'Content-Length':fs.statSync(pathname).size
				})
				res.write(data,content['encode'])
				res.end()
			}
		})
		return
	}else{
		res.writeHead(413,{'Content-Type':'text/plain;charset=utf-8'})
		res.end('We will not reutrn anything for this extname')
	}
}
}