'use strict'
let	log		=	(...rest) => console.log(...rest)
let toWs = (data,FIN,Opcode) => {
	if(typeof FIN !== 'number')FIN = 1;
	if(typeof Opcode !== 'number')Opcode = 1;
	let e = [],d=new Buffer(data)
	e[0]=(FIN<<7)+(Opcode)
	e[1]= ( d.length<126 && d.length )
	return Buffer.concat([new Buffer(e),d])
}
module.exports = toWs