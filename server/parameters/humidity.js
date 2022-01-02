let humidityValue = 65;
const fs = require('fs');

exports.socketHumidity = function (socket) {
  socket.on('humidity', (value) => {
    fs.readFile('./setValues/outputHumidity.txt', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return
      }
      humidityValue = data;
    });
    socket.emit('humidity', {
      createdAt: new Date().toLocaleTimeString(),
      value: +humidityValue,
      name: 'humidity'
    });
  })

  socket.on('sethumidity', value => {
    fs.writeFile('./setValues/humidity.txt', `${value}`, err => {
      if (err) {
        console.error(err);
        return
      }
    });
  })
}
