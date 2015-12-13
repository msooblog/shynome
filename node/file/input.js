var fileType	=	require('./fileType.json')
console.log(fileType)
process.stdin.on('data',function(data){
	var str	=	data.toString().split(/\r\n/)[0]
	var arr	=	str.split(' ')
	var obj	=	{
		'type'		:	arr[1]
	}
	if(!arr[1]){
		console.log('输入失败')
		return
	}else if( arr[2] ){
		obj['encode']	=	arr[2]
	}
	fileType[arr[0]]	=	obj
	require('fs').writeFile(__dirname+'/fileType.json',JSON.stringify(fileType),function(err){
		if(err)console.log('写入失败');
		else	console.log('成功'+'\r\n'+arr[0]+':'+'obj')
	})
})