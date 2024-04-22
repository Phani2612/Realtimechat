const Express = require('express');
const http = require('http');
const cors = require('cors'); // Corrected import for cors middleware
const { Server } = require('socket.io');
// const { createServer } = require('node:http');

const App = Express();
const server = http.createServer(App);

// Use cors middleware to enable CORS
App.use(cors());


App.use(Express.urlencoded())


App.use(Express.json())

const io = new Server(server,{

    cors : {
        
    },

    connectionStateRecovery : {}


});



// App.get('/data' , function(req,res)
// {
//      res.sendFile(__dirname+'/index.html')
// })

// ///////////////////////////Rooms concept

// io.on('connection', (socket) => {
//     // Handle joining room
//     socket.on('joinRoom', (room) => {
//         socket.join(room);
//         console.log(`User ${socket.id} joined room ${room}`);
//     });
    
//     // Handle leaving room
//     socket.on('leaveRoom', (room) => {
//         socket.leave(room);
//         console.log(`User ${socket.id} left room ${room}`);
//     });

//     // Handle messages in rooms
//     socket.on('message', (data) => {
//         const { room, message } = data;
//         io.to(room).emit('message', message);
//         console.log(`Message sent to room ${room}: ${message}`);
//     });
// });

// ///////////////////////////////




io.on('connection', (socket) => {
     
    console.log("user connected ",socket.id)
    
        socket.on('Join_room' , (data)=>{

            socket.join(data)

            console.log(data)
        })


        socket.on('send_message',(MessageInfo)=>{

            // console.log(MessageInfo)

            socket.to(MessageInfo.room).emit('receive_message',MessageInfo)

        })
      
        socket.on('disconnect' , ()=>{

            console.log("user disconnected",socket.id)
        })


});








const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


