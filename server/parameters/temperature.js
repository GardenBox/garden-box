let tempValue;

exports.socketTemperature = function (socket) {
  socket.on('temperature', () => {

    fs.readFile('./setValues/outputTemperature.txt', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      tempValue = data;
    });

    socket.emit('temperature', {
      createdAt: new Date().toLocaleTimeString(),
      value: tempValue,
      name: 'temperature'
    });
    console.log('Temperatura z serwera', tempValue)
  })

  socket.on('settemperature', value => {
    console.log('Temperatura z komputera', value);
    fs.writeFile('./setValues/temperature.txt', `${value}`, err => {
      if (err) {
        console.error(err);
        return
      }
    });
  })
}
