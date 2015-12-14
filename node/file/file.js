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
		fs.exists( pathname , (exists) => {
			if( !exists ){
				res.writeHead(500,{'Content-Type':'text/plain;charset=utf-8'})
				res.end(pathname+'不存在')
			}else{
				let states=fs.statSync(pathname)
				let range=((range)=>{if( range === undefined )return 0;else return parseFloat(range.slice(6))})(req.headers.range)

				if( range === 0)res.writeHead({'Accept-Range': 'bytes'});
				else res.writeHead({'Content-Range': 'bytes ' + range + '-' + (states.size - 1) + '/' + states.size});

				if(isNaN(range)){
					res.writeHead(500)
					res.end()
					return
				}
				
				res.writeHead(206,{
					'Content-Type':content['type']+';charset='+content['encode']
					,'Content-Length':states.size-range
				})
				console.log(req.headers.range,range)
				fs.createReadStream( pathname ,{ start: range })
					.on('data',(chunk)=>res.write(chunk,content['encode']))
					.on('end',()=>{res.writeHead(200);res.end()})
					.on('error',(e)=>{
						res.writeHead(500,{'Content-Type':'text/plain;charset=utf-8'})
						res.end(pathname+'读取错误')
					})
			}
		})
		return
	}else{
		res.writeHead(413,{'Content-Type':'text/plain;charset=utf-8'})
		res.end('We will not reutrn anything for this extname')
	}
}
}
