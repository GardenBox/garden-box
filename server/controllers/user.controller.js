const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');

exports.resetPassword = async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  const decoded = jwt.decode(token);
  const email = decoded.email;

  hashedPassword = await bcrypt.hash(req.body.newPassword, 3);

  try {

    let user = await User.findOne({
      where: {
        email
      }
    });

    user.password = hashedPassword;

    await user.save();
    return res.status(200).json({
      message: 'Hasło zostało zmienione pomyślnie.'
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Nie udało się zmienić hasła.'
    });
  }
}

exports.getImages = async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  const decoded = jwt.decode(token);
  const email = decoded.email;

  try {

    let user = await User.findOne({
      where: {
        email
      }
    });
    console.log(user)

    return res.status(200).json({
      message: 'OK',
      images: user.images
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Nie udało się pobrać zdjęć.'
    });
  }
}

exports.uploadImage = async (req, res) => {
  console.log(req.files)
  const token = req.headers.authorization.replace('Bearer ', '');
  const decoded = jwt.decode(token);
  const email = decoded.email;
  try {

    if (!req.files) {
      throw new Error();
    } else {
      let img = req.files.image;
      img.mv('./../src/assets/images/' + img.name);
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (user.images == null) user.images = []
      user.images.push({
        name: img.name,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
      })
      let arr = user.images;
      console.log('show user.images', user.images);
      console.log('arr', arr)
      await user.update({
        images: arr
      }, {
        where: {
          email
        }
      })
      user.changed('images', true)
      await user.save();
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
