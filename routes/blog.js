const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

// Đặt route tĩnh lên trên
router.get('/create', blogController.create);
router.post('/store', blogController.store);

// Đặt route động xuống dưới cùng
router.get('/:slug', blogController.show);

module.exports = router;