const Food = require('../models/Food');
const Category = require('../models/Category');

// @desc   Get all foods with optional search & filter
// @route  GET /api/foods
// @access Public
const getFoods = async (req, res) => {
  const { search, category } = req.query;
  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  if (category) {
    filter.category = category;
  }
  try {
    const foods = await Food.find(filter);
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Get single food by ID
// @route  GET /api/foods/:id
// @access Public
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Create new food (admin)
// @route  POST /api/foods
// @access Admin
const createFood = async (req, res) => {
  const { name, description, image, price, category, available } = req.body;
  if (!name || price == null || !category) {
    return res.status(400).json({ message: 'Name, price and category are required' });
  }
  try {
    const food = await Food.create({ name, description, image, price, category, available });
    res.status(201).json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Update food (admin)
// @route  PUT /api/foods/:id
// @access Admin
const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Delete food (admin)
// @route  DELETE /api/foods/:id
// @access Admin
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json({ message: 'Food deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getFoods, getFoodById, createFood, updateFood, deleteFood };

