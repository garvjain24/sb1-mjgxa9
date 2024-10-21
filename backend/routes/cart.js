const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

// Add product to cart
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user.userId);
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to cart' });
  }
});

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

// Remove product from cart
router.delete('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Error removing from cart' });
  }
});

module.exports = router;