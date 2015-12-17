'use strict'
const 	path	=	require('path')
,		fs		=	require('fs')
,		log		=	(...rest) => {}

let watchDir=function(pathname){
	fs.readdir(pathname,function(err,data){
		if(err){
		}else{
			console.log(pathname+'已被监听')
			fs.watch(pathname,function(type,filename){
				switch(type){
					case	'change'	:
					var cache	=	path.join(pathname,filename)
					if(require.cache[cache]){
						delete require.cache[cache]
						log('\r\n'+cache+'缓存已被清除')
						return
					}else{
						//log(cache)
					}
					break
					case	'rename'	:
					if(filename){
						watchDir(path.join(pathname,filename))
						log(pathname+'出现了新文件：'+filename)
						return
					}else{
						log(pathname+'有一个文件消失了')
						return 'delete'
					}
					break
					default	:
					log(arguments)
					return
				}
					
			})
			for(var i in data){
				watchDir(path.join(pathname,data[i]))
			}
		}
	})
}

module.exports=watchDir