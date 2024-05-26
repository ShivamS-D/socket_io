
const io=require('socket.io')(3000,{
  cors:{
    origin:['https://socket-io-1hzo.vercel.app/?']
  }

})
io.on('connection',socket=>{
  console.log(socket.id)
 
  
  socket.on('join-room',(room,cb)=>{
    socket.join(room)
    
    cb('Joined Room '+room)
      socket.on('send_message',(string,room)=>{
        if (room === '') {
          socket.broadcast.emit('receive-message', string);
          console.log(`Broadcasting message globally: ${string}`);
        } else {
          socket.to(room).emit('receive-message',string);
          console.log(string)
          }
        console.log(string)
      })
  })
})
