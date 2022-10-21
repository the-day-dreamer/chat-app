// server on which our backend will run
const io = require('socket.io')(3000,{cors : {origin:"*"}})
const users = {}
io.on('connection',socket=>{
    // socket.emit('chat-message',"hello world")
    console.log("new user")
    socket.on('new-user',name=>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected',name)
    })
    socket.on('send-chat-message',message=>{
        socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]})
    })
})