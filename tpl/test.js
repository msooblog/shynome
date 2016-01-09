//'use strict'
var  x=6
console.log(require('./fs')("./test.tpl",{hello:"hello",world:"world","a":"!"},__dirname))