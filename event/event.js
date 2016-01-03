'use strict'
// nodejs4.0默认不开启Rest,请使用 --harmony_rest_parameters flag
// this.emit(event.[...argv])触发事件
//run的回调函数也可以返回 [event,...argv] 来触发事件，支持function* 返回其他类型有可能出现错误
//on:事件监听
//约定事件回调函数返回'one'时,表示这个函数在这次调用完成从事件回调函数队列中删除，不支持function*
//约定数据以下划线开始_dataName,事件eventName
//one的回调总是返回'one'
//destory,将这个事件对象指向null

let _event={
	get on(){ return ( event ,callback ) => {
		if( typeof event === 'undefined' )return this;
		var handler = this[ event ] || (() => { this[ event ] = [] ; return this[ event ] })()
		if( typeof callback === 'function' )handler.push(callback);
		else console.error( 'No event name or No callback func');
		return this
	}}
	,get emit(){ return ( event ,...r ) => {
		var handler = this[ event ]
		if( ! handler ) return this;
		handler.forEach( ( e ,indeOf ,self ) => { if( e( this ,...r ) === 'one' )handler.splice( indeOf ,1 ); } )
		return this
	}}
	,get one(){ return ( event ,callback ) => {
		if( typeof event === 'undefined' )return this;
		let handler = this[ event ] || (() => { this[ event ] = [] ; return this[ event ] })()
		if( typeof callback === 'function' ){ handler.push( (...r) => { callback(...r) ; return 'one' } )}
		else console.error( 'No event name or No callback func');
		return this
	}}
	,get run(){ return ( callback ) => { 
		if(typeof callback !== 'function' )return this;
		let last= (() => { if( typeof process !== 'undefined' )return process.nextTick;else return false;})() || setTimeout
		last(()=>{
		let cb = callback( this );
		if(cb && cb.next){
			let loop = ( cb ) => { 
				let next = cb.next( ) 
				if( next.done === true )return;
				if( typeof next.value.splice === 'function' )this.emit( next.value.splice(0,1) , next.value );
				return loop( cb );
			}
			loop( cb )
		}
		},0)
		return this 
	}}
	,get destory(){return this=null}
}

module['exports']=cb=>Object.create(_event).run( cb )