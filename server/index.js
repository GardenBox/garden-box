const express = require('express');
const cors = require('cors');
const air = require('./parameters/air');
const humidity = require('./parameters/humidity');
const light = require('./parameters/light');
const temperature = require('./parameters/temperature');
const parameter = require('./controllers/parameter.controller')
const sequelize = require('./database');
const router = require('./routes');
const INTERVAL = 5 * 1000; // milisekundy
const path = require('path');
const session = require("express-session")({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true
});

const sharedsession = require("express-socket.io-session");

sequelize.sync().then(() => console.log('db is ready'));

const app = express();

// const expressServer = app.listen(80, '192.168.137.160', async () => {
const expressServer = app.listen('5000', async () => {
  console.log('listen');
  setInterval(parameter.createMeasurement, INTERVAL);
});

app.use(cors({
  origin: '*'
  // origin: '192.168.137.160:80'
}))
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(express.static('dist/garden-box'));
app.use('/api', router);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../server/dist/garden-box/index.html'));
})
app.use(session);

const io = require("socket.io")(expressServer, {
  cors: {
    // origin: "192.168.137.160:80",
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"]
  }
});

io.use(sharedsession(session, {
  autoSave: true
}));

io.on("connection", socket => {
  console.log('init connection...');
  socket.handshake.session.userdata = 'secret';
  socket.handshake.session.save();

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  humidity.socketHumidity(socket);
  temperature.socketTemperature(socket);
  air.socketAir(socket);
  light.socketLight(socket);
});
