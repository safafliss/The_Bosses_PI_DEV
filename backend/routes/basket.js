const express = require('express');
const router = express.Router();
const passport = require('passport');
const {ROLES, inRole} = require('../security/RoleMiddleware');

const {addToBasket, getBasket, updateBasket} = require('../controllers/basketController');

// Add product to a basket
router.post('/basket/add', async (req, res) => {
    const {productId, price, quantity, userId} = req.body;

    try {
        const basket = await addToBasket(productId, price, quantity, userId);
        res.status(200).json(basket);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to add product to basket'});
    }
});

router.put('/basket', async (req, res) => {
    try {
        const basket = req.body;
        const basketUpdate = await updateBasket(basket);
        res.status(200).json(basketUpdate);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/basket/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const basket = await getBasket(userId);
        res.status(200).json(basket);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});
module.exports = router;
