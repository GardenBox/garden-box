const express = require('express');
const router = express.Router();
const auth = require('./controllers/auth.controller');
const user = require('./controllers/user.controller');
const fileUpload = require('express-fileupload');
const plant = require('./controllers/plant.controller');
const images = require('./controllers/images.controller');
const parameter = require('./controllers/parameter.controller');

router.use(fileUpload());

router.post('/plant/images', images.uploadImage);
router.get('/plant/images', images.getImages);
router.delete('/plant/images/:name', images.removeImage);

router.get('/plant', plant.getPlant);
router.patch('/plant', plant.editPlant);

router.put('/user', user.resetPassword);

router.post('/registration', auth.registration);
router.post('/login', auth.login);

router.get('/:parameter/oneDay?', parameter.getOneDayParameter)
router.get('/:parameter/:limit', parameter.getParameter);
router.get('/:parameter?', parameter.getDateParameter);

module.exports = router;
