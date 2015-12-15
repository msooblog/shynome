'use strict'

'use strict'
const x=Object.create([])
x.push('dsd')
x.push('dsdsada')
x.push('sdaaaaaaaaaa')
console.log(x[1])
x.splice(0,1)
x.splice(2,1)
console.log(x[1])

const Port = 500

let Client=require('net').connect( Port , () => console.log(`连接成功`))

Client
	.on('error',(error) => console.log(`错误出现:${error}`))
	.on('data',(data) => console.log(data.toString()))
	.on('end',() => console.log(`服务器关闭连接`))

process.stdin.pipe(Client)