const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');
const protect = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', getCategories);
router.post('/', protect, admin, createCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;

