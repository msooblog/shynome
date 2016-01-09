'use strict'
{
	let fs=require('fs')
	,	path=require('path')
	,	tpl=(s,o)=>require('./tpl')(s,o)
	module['exports']=dirname=>(f,o,s)=>{
		if(s!==undefined)return tpl(s,o)
		if(o===undefined)return fs.readFileSync(path.join(dirname,f),'utf8');
		return tpl(fs.readFileSync(path.join(dirname,f),'utf8'),o)
	}
}