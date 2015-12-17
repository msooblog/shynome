'use strict'
let	log		=	(...rest) => console.log(...rest)
let toWs = data => {
	let e = [],d=new Buffer(data)
	e[0]=(1<<7)+(1)
	e[1]= ( d.length<126 && d.length )
	return Buffer.concat([new Buffer(e),d])
}


module.exports = toWs