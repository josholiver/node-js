const express = require('express')
const path = require('path')
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
// const INDEX = path.join(__dirname, 'public','index.html');

const server = express()
  .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on("chat", function(chat){
  	socket.broadcast.emit("message",chat);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

