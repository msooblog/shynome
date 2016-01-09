'use strict'
module['exports']=(..._scope)=>{
	_scope={s:_scope[0],o:_scope[1],a:'',v:''}
	for(let i in _scope.o){_scope.a+=`${i},`;_scope.v+=`_scope.o['${i}'],`}
	try{
		return eval(`((${_scope.a.slice(0,-1)})=>${_scope.s})(${_scope.v.slice(0,-1)})`)
	}catch(err){
		return err.toString()
	}
}