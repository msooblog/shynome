#事件函数

有两个版本默认es6，还有一个es5的版本

#API:
ps:All API always return this , so you can chain-callback

#emit
this.emit(event,[...rest])//just like : apply(this,[...rest])

#on
.on(event,cb)
${cb}=function(...rest){}

if ${cb} return 'one' => .one

#one
.one(event,cb)

cb() then splice cb

#run
run(cb)

ps:event(cb) => this.run(cb)

${cb} can be function* in es6,if you yield || return [event,..rest] => this.emit(event,...callback)

