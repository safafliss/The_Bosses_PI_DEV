const mongoose = require('mongoose');
const Delivery = require('../models/Delivery');

const addToDelivery = async (userId, adress, totalPrice) => {
  try {
    let delivery = await new Delivery({
      user: userId,
      adress: adress,
      totalPrice: totalPrice,
    });
    await delivery.save();
    return delivery;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addToDelivery,
};
