'use strict'
{
let tpl=(s,o)=>{
	this.a=this.o=''
	for(let i in o){
		this.a+=`${i},`
		this.o+=`o['${i}'],`
	}
	{
		return eval(`((${this.a.slice(0,-1)})=>${s})(${this.o.slice(0,-1)})`)
	}
}
module['exports']=tpl
}