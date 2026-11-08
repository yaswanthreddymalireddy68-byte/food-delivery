require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Food = require('./models/Food');
const User = require('./models/User');

const categories = [
  { name: 'Pizza',       description: 'All kinds of pizza' },
  { name: 'Burgers',     description: 'Juicy burgers' },
  { name: 'Biryani',     description: 'Aromatic rice dishes' },
  { name: 'Indian Food', description: 'Classic Indian cuisine' },
  { name: 'Chinese Food',description: 'Wok-stirred delights' },
  { name: 'Sandwiches',  description: 'Quick bites' },
  { name: 'Desserts',    description: 'Sweet treats' },
  { name: 'Beverages',   description: 'Drinks & smoothies' },
];

const foods = [
  { name: 'Margherita Pizza',    description: 'Classic cheese pizza with fresh basil',         image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', price: 250, category: 'Pizza',        available: true },
  { name: 'Pepperoni Pizza',     description: 'Loaded with spicy pepperoni slices',             image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', price: 320, category: 'Pizza',        available: true },
  { name: 'BBQ Chicken Pizza',   description: 'Smoky BBQ chicken on golden crust',              image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', price: 350, category: 'Pizza',        available: true },
  { name: 'Classic Cheeseburger',description: 'Beef patty with cheddar and fresh veggies',      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', price: 180, category: 'Burgers',      available: true },
  { name: 'Veggie Burger',       description: 'Healthy grilled veggie patty',                   image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', price: 160, category: 'Burgers',      available: true },
  { name: 'Double Smash Burger', description: 'Two smashed patties with special sauce',         image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400', price: 220, category: 'Burgers',      available: true },
  { name: 'Chicken Biryani',     description: 'Fragrant basmati with tender chicken',           image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', price: 320, category: 'Biryani',      available: true },
  { name: 'Mutton Biryani',      description: 'Rich and aromatic mutton biryani',               image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400', price: 380, category: 'Biryani',      available: true },
  { name: 'Veg Biryani',         description: 'Colourful vegetable biryani with saffron',       image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400', price: 260, category: 'Biryani',      available: true },
  { name: 'Butter Chicken',      description: 'Creamy tomato-based butter chicken curry',       image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', price: 280, category: 'Indian Food',  available: true },
  { name: 'Paneer Tikka Masala', description: 'Grilled paneer in spiced masala gravy',          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', price: 260, category: 'Indian Food',  available: true },
  { name: 'Dal Makhani',         description: 'Slow-cooked black lentils in rich gravy',        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', price: 200, category: 'Indian Food',  available: true },
  { name: 'Veg Fried Rice',      description: 'Chinese-style stir-fried rice with vegetables',  image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400', price: 180, category: 'Chinese Food', available: true },
  { name: 'Chicken Chow Mein',   description: 'Stir-fried noodles with chicken and veggies',   image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400', price: 200, category: 'Chinese Food', available: true },
  { name: 'Veg Spring Rolls',    description: 'Crispy rolls filled with cabbage and noodles',   image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400', price: 150, category: 'Chinese Food', available: true },
  { name: 'Club Sandwich',       description: 'Triple-layer sandwich with chicken and veggies', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', price: 140, category: 'Sandwiches',   available: true },
  { name: 'Grilled Cheese',      description: 'Melted cheddar in buttered toasted bread',       image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400', price: 120, category: 'Sandwiches',   available: true },
  { name: 'Chocolate Brownie',   description: 'Warm fudgy brownie with chocolate chips',        image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400', price: 100, category: 'Desserts',     available: true },
  { name: 'Ice Cream Sundae',    description: 'Vanilla ice cream with toppings and fudge',     image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', price: 130, category: 'Desserts',     available: true },
  { name: 'Mango Smoothie',      description: 'Fresh Alphonso mango blended with milk',         image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400', price: 90,  category: 'Beverages',    available: true },
  { name: 'Fresh Lemonade',      description: 'Chilled lemonade with mint and salt',            image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400', price: 80,  category: 'Beverages',    available: true },
  { name: 'Cold Coffee',         description: 'Blended coffee with milk and ice cream',         image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', price: 110, category: 'Beverages',    available: true },
];

async function runSeed() {
  try {
    await connectDB();

    await Category.deleteMany({});
    await Food.deleteMany({});
    await User.deleteMany({});

    await Category.insertMany(categories);
    console.log('✅  Categories seeded');

    await Food.insertMany(foods);
    console.log('✅  Foods seeded (22 items)');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('admin123', salt);
    await User.create({ name: 'Admin', email: 'admin@example.com', password: hashed, role: 'admin' });
    console.log('✅  Admin created → email: admin@example.com | password: admin123');

    console.log('🎉  Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌  Seed error:', err);
    process.exit(1);
  }
}

runSeed();

