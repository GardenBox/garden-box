let lightValue;

exports.socketLight = function (socket) {

  socket.on('light', () => {
    fs.readFile('./setValues/outputLight.txt', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      lightValue = data;
    });

    socket.emit('light', {
      createdAt: new Date().toLocaleTimeString(),
      value: +lightValue,
      name: 'light'
    });
    console.log('Oświetlenie z serwera', lightValue)
  })

  socket.on('setlight', value => {
    console.log('Oświetlenie z komputera', value);
    fs.writeFile('./setValues/light.txt', `${value}`, err => {
      if (err) {
        console.error(err);
        return
      }
    });
  })
}
