import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBasket, updateBasket } from '../redux/actions/basketActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { fetchProducts } from '../redux/actions/productActions';

function BasketPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let userId = useSelector((state) => state.auth.user.id);

  const [isOpen, setIsOpen] = useState(false);

  async function getExistingBasket() {
    await dispatch(getBasket(userId));
  }

  async function getProducts() {
    await dispatch(fetchProducts());
  }

  useEffect(() => {
    getExistingBasket().then((r) => console.log('basket got from redux ', r));
    getProducts().then((r) => console.log('products in basketPage ', r));
  }, []);

  const basket = useSelector((state) => state.basket);
  const isLoading = useSelector((state) => state.basket.loading);
  const error = useSelector((state) => state.basket.error);
  const basketItems = useSelector((state) => state.basket.basketItems);
  const productsList = useSelector((state) => state.productList);
  const handleBasketDialog = () => {
    setIsOpen(!isOpen);
  };

  function handleBackToProductsList() {
    navigate('/products');
  }

  function handleProceedToCheckout() {
    navigate('/checkout');
  }

  async function onIncreaseQuantity(index) {
    let basketLocal = {};
    // Get specific product from list of products

    let productIndex = productsList.products.findIndex((product) => {
      return product._id === basketItems[index].productId._id;
    });

    // Compare basket quantity to Product stock
    if (
      productsList.products[productIndex].quantity >=
      basketItems[index].quantity + 1
    ) {
      basketItems[index].quantity++;
      basket.basket.products = basketItems;
      basketLocal = basket.basket;
      await dispatch(updateBasket(basketLocal));
    }
  }

  async function onDecreaseQuantity(index) {
    let basketLocal = {};
    // Get specific product from list of products

    let productIndex = productsList.products.findIndex((product) => {
      return product._id === basketItems[index].productId._id;
    });
    // Compare basket quantity to Product stock

    if (basketItems[index].quantity > 0) {
      basketItems[index].quantity--;
      basket.basket.products = basketItems;
      basketLocal = basket.basket;
      await dispatch(updateBasket(basketLocal));
    }

    if (basketItems[index].quantity == 0) {
      await oneDeleteProduct(index);
    }
  }

  async function oneDeleteProduct(index) {
    let basketLocal = basket.basket;
    basketLocal.products.splice(index, 1);
    await dispatch(updateBasket(basketLocal));
  }

  // display as list
  if (location.pathname === '/basket') {
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basketItems.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell component="th" scope="row">
                    {product._id}
                  </TableCell>
                  <TableCell align="right">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => onDecreaseQuantity(index)}>-</Button>
                    {product.quantity}
                    <Button onClick={() => onIncreaseQuantity(index)}>+</Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => oneDeleteProduct(index)}>X</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleBackToProductsList}
            >
              Back to Products List
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </TableContainer>
      </>
    );
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>You have no basket yet</h2>;
  }

  if (basketItems == null) {
    return <p>Your basket is empty.</p>;
  }

  // display as popup
  return (
    <>
      <IconButton
        onClick={handleBasketDialog}
        className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2"
      >
        <Typography variant="body1" color="inherit">
          {basketItems.length}
        </Typography>
      </IconButton>

      <Dialog open={isOpen} onClose={handleBasketDialog}>
        <DialogTitle>
          Your Basket
          <IconButton
            onClick={handleBasketDialog}
            style={{ position: 'absolute', right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basketItems.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">
                      {product.price * product.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBasketDialog} color="primary">
            Close
          </Button>
          <Link to="/basket">
            <Button color="primary">Basket</Button>
          </Link>
          <Link to="/checkout">
            <Button color="primary">Checkout</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BasketPage;
