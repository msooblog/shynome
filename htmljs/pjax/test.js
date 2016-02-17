define((require,exports,module)=>{
	var ajax=require('./ajax')('a','b')
	console.log(ajax(
		'./test.json'
		,null
		,{
			method:'post'
			,headers:{
				'Name':'6666'
			}
		}
		).then(xhr=>console.log(xhr),xhr=>console.log(xhr))
	)
})