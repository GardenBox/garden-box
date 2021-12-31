const Plant = require('../models/Plant');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
exports.uploadImage = async (req, res) => {
  const createdAt = req.body.createdAt;
  console.log(createdAt);
  try {
    if (!req.files) {
      res.status(400).send({
        message: 'Brak pliku!'
      });
    } else {
      let img = req.files.image;
      console.log(img);
      img.mv('./../src/assets/images/' + img.name);

      const plant = await Plant.findOne({
        where: {
          id: 1
        }
      })

      if (plant.images == null) plant.images = [];

      plant.images.push({
        name: img.name,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
      })

      let images = plant.images;

      await plant.update({
        images
      }, {
        where: {
          id: 1
        }
      });

      await plant.save();

      plant.changed('images', true);

      await plant.save();

      res.status(201).json({
        status: true,
        message: 'Plik został wgrany.',
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

exports.getImages = async (req, res) => {

  try {
    let plant = await Plant.findOne({
      where: {
        id: 1
      }
    });

    return res.status(200).json({
      message: 'OK',
      images: plant.images
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Nie udało się pobrać zdjęć.'
    });
  }
}

exports.removeImage = async (req, res) => {
  const name = req.params.name;
  console.log(req.params);

  try {
    let plant = await Plant.findOne({
      where: {
        id: 1
      }
    });

    let images = plant.images;
    let newImages = images.filter(image => image.name != name);

    await plant.update({
      images: newImages
    }, {
      where: {
        id: 1
      }
    })

    plant.changed('images', true)

    await plant.save();
    let filepath = path.join(__dirname + `/../../src/assets/images/`);
    console.log(`${filepath}${name}`);
    fs.unlink(`${filepath}${name}`, (err) => {
      if (err) throw err;
      console.log('File was deleted');
    });

    res.status(201).json({
      status: true,
      message: 'Plik został usunięty.',
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Nie udało się usunąć pliku.'
    });
  }
}
