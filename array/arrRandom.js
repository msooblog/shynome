'use strict'
const isArr = arr => arr.constructor === [].constructor
module.exports = arr => {
	arr = arr || []
	let exports = {
		get rest(){return arr}
		,extract : (n,debug)=>{
			n = isNaN(n) ? 1 : n
			let arr_r = []
			,	random = []
			for(let i=0;i<n;i++){
				let r = Math.floor(Math.random()*arr.length)
				arr_r=arr_r.concat(arr.splice(r,1))
				random.push(r)
			}
			return debug ? {arr : arr_r ,random :random} : arr_r
		}
		,push : opt=>{
			if(isArr(opt)){
				arr = arr.concat(opt)
				return exports
			}
			for(let o in opt){
				let arr_l = []
				for(let i=0;i<opt[o];i++){
					arr_l.push(o)
				}
				arr = arr.concat(arr_l)
			}
			return exports
		} 
		,constructor : opt => ( arr = [] , exports.push(opt) )
		,name : 'arrRandom'
	}
	return isArr(arr) ? exports : exports.constructor(arr)
}