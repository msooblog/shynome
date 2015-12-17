'use strict'
let parse = function(data){
	let i=0
	,	FIN = data[i] >> 0
	,	RSV = data[i]
	,	opcode = data.slice(i,i+=4)
	,	length = data.slice(i,i+=7)
	console.log(parseInt(data[0],16).toString(2))
}


module.exports = parse