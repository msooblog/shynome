'use strict'

let _arr = {
	_length : 0
	,get splice(){return (start,num) => {
		for(let i=0;i<num;i++){
			delete this[start+i]
		}
	}}
	,get push(){return (a) => {
		console.log(a,arguments)
	}}
	,get length(){return this._length}

}

module.exports = Object.create(_arr)