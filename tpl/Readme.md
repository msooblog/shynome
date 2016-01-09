#要求#
es6 (...r)=>{}  
你需要加上flag:`--harmony_rest_parameters`来开启node对Rest的支持，用法像这样:`node --harmony_rest_parameters yourapp`   
 node module['exports']=tpl  
 *ps:以后node支持es6模块加载会更新掉*
#作用#
##与引用作用域分割  
`
var b=7
var tpl=require('./tpl')
tpl("\`${a},${b}\`",{a:6})
throw err : b is not defined
`  
*注:_scope是变量宿主，所以你可以访问到，但不推荐 *
#增强#
在node4.0里，引用了`fs`,`path`自带模块，使用`fs.readFileSync`增加了对小型文件的访问  
你可以这样引用`var tpl=require('./tpl/fs')(path)`，访问的文件都是相对于`path`变量的 
##用法#

###返回读取到的字符串#
`tpl(filepath)`

###用eval共享当前作用域#
`eval(tpl(filepath))`  
需要自己捕捉错误避免程序崩溃

###返回解析好的`String`#
`tpl(filepath,{a:6})`
`tpl(filepath,null)`  
第二个参数总是需要的，哪怕是null

###解析一个超级字符串#
`tpl(null,{},String)`  
当你传入第三个变量时,你的第一个变量将会被忽视

#模板文件#
一份模板文件就像这样：`example.html`  
``
`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>example</title>
</head>
<body>
	${a}
`
+(()=>a)()+
(function(){return a})()+
`
</body>
</html>
`  
``  
你可以在其中插入函数，记得加上`+`号，不建议在其中使用函数，逻辑应该放在引用该模板的文件中
