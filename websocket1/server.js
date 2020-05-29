const app = require('http').createServer()
const io = require('socket.io')(app);

app.listen(8080);

io.on('connection', (socket) => {
  console.log('Connected');
  
  // socket.emit
  // io.emit
  // socket.broadcast.emit
  //én csak egy comment vagyok
 
  socket.on('send notification', (message) => {
	  // socket.broadcast.emit('notification sent', message);
	  io.emit('notification sent', message);
  });	
});