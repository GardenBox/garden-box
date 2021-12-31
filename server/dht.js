 const sensorLib = require("node-dht-sensor");
 const fs = require("fs");

 function writeValues() {
  const sensorResult = sensorLib.read(11, 18);
  console.log(sensorResult.humidity)
  console.log(sensorResult.temperature)
  fs.writeFile('./setValues/outputAirHumidity.txt', `${sensorResult.humidity}`, err => {
   if (err) {
     console.error(err);
     return
   }
 });
 fs.writeFile('./setValues/outputTemperature.txt', `${sensorResult.temperature}`, err => {
   if (err) {
     console.error(err);
     return
   }
 });
 }
 setInterval(writeValues, 1000)
 