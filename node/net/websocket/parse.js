'use strict'
let	log		=	(...r) => console.log(...r)
,	toWs	=	(...r) => require('./toWs')(...r)
var l= (j,s)=> (j && l(--j,s+s) ) || s
let parse = (data,socket) => {
	log(data[0].toString(2),(new Date()).toString())
	let i=0,frame={
		FIN:data[i]>>7
		,RSV:(data[i]>>4)&7
		,Opcode:data[i]&15//文件类型
		,Mask:data[++i]>>7//掩码
		,Length:data[i]&127//长度在126以下的数据长度
	}
	frame.Length = (frame.Length<126 && frame.Length) 
	|| (frame.Length===126 && (data[++i]<<8)+data[++i])
	|| (frame.Length===127 && (data[++i]<<56)+(data[++i]<<48)+(data[++i]<<40)+(data[++i]<<32)+(data[++i]<<24)+(data[++i]<<16)+(data[++i]<<8)+data[++i])
	frame.Key = (!frame.Mask) || [data[++i],data[++i],data[++i],data[++i]]
	frame.Data = data.slice(++i,i+frame.Length)
	if(frame.Key)frame.Data.forEach((e,indexOf,self)=>self[indexOf]=(e^frame.Key[indexOf%4]));
	log('_____________________________________________________________________________________________________')
	log(data.length,i,frame.Length)
	//socket.write(toWs(l(18,'d')))
	return frame
}


module.exports = parse