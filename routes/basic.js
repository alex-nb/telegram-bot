const express = require('express');

//const { body } = require('express-validator/check');

const basicController = require('../controllers/basic');

const router = express.Router();

router.post('/',basicController.startBot);

module.exports = router;