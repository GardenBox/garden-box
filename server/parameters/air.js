let airValue;

exports.socketAir = function (socket) {

  socket.on('air', () => {
    fs.readFile('./setValues/outputAirHumidity.txt', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
      airValue = data;
    });

    socket.emit('air', {
      createdAt: new Date().toLocaleTimeString(),
      value: airValue,
      name: 'air'
    });
    console.log('Wilgotnosc powietrza z serwera', airValue)
  })
}
