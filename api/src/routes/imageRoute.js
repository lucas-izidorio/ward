const express = require('express');
const router = express.Router();
const controller = require('../controllers/imageController')

router.use(express.json());
router.post('/', controller.post);

module.exports = router;