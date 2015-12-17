//es5版

var _arr = {
	_length : 0
	,_null	: []
	,get splice(){return function(start,num){
		for(var i=0;i<num;i++){
			var id=start+i
			delete this[id] && this.__proto__._null.push(id)
		}
	}}
	,get push(){return function(){
		var Rest = arguments
		for(var i in arguments){
			var e = arguments[i];
			( this.__proto__._null.length && (function(e){
				this[this.__proto__._null.shift()] = e 
				console.log(this)
				return true
			}).apply(this,[e]) ) || (function(e){ 
				console.log(this.__proto__._length)
				this[this.__proto__._length++] = e
				return true
			}).apply(this,[e])
		}
	}}
	,get length(){return this._length}
}

module.exports = Object.create(_arr)