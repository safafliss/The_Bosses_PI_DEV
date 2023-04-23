const express = require('express');
const router = express.Router();
const { resolve } = require('path');
const Basket = require('../models/Basket');
const User = require('../models/users.models');

const { addToDelivery } = require('../controllers/deliveryController');

router.put('/add/:userId', async (req, res) => {
  const { userId } = req.params;
  const basket = await Basket.findOne({ user: userId });
  const user = await User.findOne({ _id: userId });
  console.log('basket ', basket);
  console.log('user ', user);

  try {
    const delivery = await addToDelivery(
      userId,
      user.adress,
      basket.totalPrice
    );
    let deletedDocument = await Basket.findOneAndDelete({
      user: userId,
    });
    console.log('deletedDocument ', deletedDocument);
    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ error: 'failed to add to delivery' });
  }
});

module.exports = router;
