const express = require('express')
const path = require('path')
// const moveTrain = require('./movetrain.js');
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'));

app.use(bodyParser.urlencoded({
  extended: true
}));

io.on('connection', function (socket) {
  socket.on('move', function (stopNumber) {
    socket.emit('movetrain', stopNumber);
    socket.broadcast.emit('movetrain', stopNumber);
  });
});
