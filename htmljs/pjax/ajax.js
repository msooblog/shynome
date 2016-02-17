define((require,exports,module)=>{
'use strict'
let	option={
	get default(){return {
		async : true
		,method : 'post'
		,type : 'json'
		,timeout : 1
		,headers : {
			'Ajax' : true
		}
	}}
	,init(options){
		let _options=this.default
		if(typeof options === 'object'){
			options = option.json(options)
			for(let i in options){
				if(typeof _options[i]==='object'){
					if(typeof options[i]==='object'){
						for(let j in options[i]){
							_options[i][j]=options[i][j]
						}
					}
				}else{
					_options[i] = options[i]
				}
			}
			return _options
		}else return _options
	}
	,json(obj){return JSON.parse(JSON.stringify(obj))}
}

const	_ajax=(username,password)=>(url,data,options)=>new Promise((resolve,reject,undefined)=>{
	let xhr=new XMLHttpRequest()
	,	_options=option.init(options)
	xhr.onloadend=e=>xhr.status===200
	?resolve(xhr)
	:reject(xhr)
	xhr.responseType=_options.type
	xhr.timeout=_options.timeout
	xhr.onerror=e=>reject(xhr)
	xhr.ontimeout=e=>reject(xhr)
	xhr.open(_options.method,url,_options.async,username||null,password||null)

	for(var i in _options.headers){xhr.setRequestHeader(i,_options.headers[i])}
	//set request headers

	xhr.onbeforeSend=e=>{}
	xhr.send(data===undefined?null:JSON.stringify(data))
})

module.exports=_ajax
//ajax('hello',{name:555},{options:null},_debug)

})