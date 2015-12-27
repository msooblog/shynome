'use strict'
/*
*自己写的一个小插件感觉很不错
*只要将原先这样写的：
*var func=require(module)
*，	 config=require(config)
*改成这样：
*var func=(...r)=>require(module)(...r)
*,	 config=()=>require(config)//使用时config(),或者直接require(config)
*就可以实时更新文件缓存
*至于会不会爆内存我就不知道哦
 */
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