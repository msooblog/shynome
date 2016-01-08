'use strict'
{
let tpl=(str,o)=>{
	o={o:o,arr:'',obj:''}
	for(let i in o.o){
		o.arr+=`${i},`
		o.obj+=`o.o['${i}'],`
	}
	{
		return eval(`((${o.arr.slice(0,-1)})=>${str})(${o.obj.slice(0,-1)})`)
	}
}
module['exports']=tpl
}