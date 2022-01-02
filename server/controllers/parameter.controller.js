const sequelize = require('sequelize');
const Measurement = require('../models/Measurement');
const ALLOWED_PARAMETERS = ['air', 'temperature', 'humidity', 'container', 'light'];
const {
  Op
} = require("sequelize");
const url = require('url');
const moment = require('moment');
const fs = require('fs');

exports.getParameter = async (req, res) => {
  const param = req.params.parameter;
  const limit = req.params.limit;

  if (!ALLOWED_PARAMETERS.includes(param) || !limit) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    try {
      const sensorData = await Measurement.findAndCountAll({
        attributes: [param, 'createdAt'],
        limit: limit,
        order: [
          ['createdAt', 'DESC']
        ]
      });
      res.status(200).json(sensorData);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  }
}

exports.getDateParameter = async (req, res) => {
  let limit;
  limit = req.query.limit;
  let date;
  date = req.query.date;

  if (!limit) limit = 11;
  const param = req.params.parameter;

  if (!ALLOWED_PARAMETERS.includes(param)) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    try {
      let exclude = ALLOWED_PARAMETERS.filter(item => item !== param);
      exclude.push('id');
      const sensorData = await Measurement.findAll({
        where: {
          createdAt: {
            [Op.like]: date + '%'
          }
        },
        limit: limit,
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: {
          exclude
        }
      });
      res.status(200).json(sensorData);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  }
}

exports.getOneDayParameter = async (req, res) => {

  const queryData = url.parse(req.url, true).query;
  let limit = queryData.limit;
  limit = req.params.limit;

  if (!limit) limit = 13;
  const param = req.params.parameter;

  if (!ALLOWED_PARAMETERS.includes(param)) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    try {
      let exclude = ALLOWED_PARAMETERS.filter(item => item !== param);
      exclude.push('id')
      const sensorData = await Measurement.findAll({
        where: {
          createdAt: {
            [Op.gt]: new Date(new Date() - 36 * 60 * 60 * 1000)
          }
        },
        limit: limit,
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: {
          exclude
        }
      });
      res.status(200).json(sensorData);
    } catch (err) {
      console.error(err);
      res.status(400);
    }
  }
}

readParameter = async (filename) => {
  return new Promise((resolve, reject) => {
      fs.readFile(`./setValues/${filename}.txt`, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    })
}

exports.createMeasurement = async () => {
  try {
    const humidity = await readParameter('outputHumidity');
    const light = await readParameter('outputLight');
    const temperature = await readParameter('outputTemperature');
    const airHumidity = await readParameter('outputAirHumidity');
    let now = new moment();

    await Measurement.create({
      light: light,
      temperature: temperature,
      humidity: humidity,
      container: 0,
      air: airHumidity,
      createdAt: now.format("YYYY-MM-DD HH:mm:ss")
    })
  } catch (err) {
    console.error(err)
  }
}
