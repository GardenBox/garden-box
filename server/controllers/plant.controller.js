const Plant = require('../models/Plant');

exports.editPlant = async (req, res) => {

  console.log(req.body);
  const name = req.body.name;

  try {
    const plant = await Plant.findOne({
      where: {
        id: 1
      }
    });

    await plant.update({
      name
    }, {
      where: {
        id: 1
      }
    });


    res.status(201).json({
      status: true,
      message: 'Nazwa rośliny zostałą zmieniona.',
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Nie udało się zmienić nazwy.'
    });
  }
}

exports.getPlant = async (req, res) => {
  try {
    let plant = await Plant.findOne({
      where: {
        id: 1
      }
    });
    console.log('plant to: ', plant);

    return res.status(200).json({
      message: 'OK',
      plant: {
        name: plant.name,
        createdAt: plant.createdAt
      }
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Nie udało się pobrać nazwy rośliny.'
    });
  }
}
