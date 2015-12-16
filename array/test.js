var x=require('./array.es5.js')
x.push('ddddd','sdsda','sadadad','ewrsacvsa')

process.stdin.on('data',()=>{console.log(x);console.log(x.__proto__)})