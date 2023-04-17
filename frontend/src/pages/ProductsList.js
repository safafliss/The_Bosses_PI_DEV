import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts} from '../redux/actions/productActions';
import {addToBasket, getBasket} from '../redux/actions/basketActions';

import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@material-ui/core';

function ProductsListScreen() {
    const dispatch = useDispatch();

    // get current user
    let userId = useSelector((state) => state.auth.user.id);

    async function getProducts() {
        await dispatch(fetchProducts());
    }

    //fetch products
    useEffect(() => {
        getProducts().then(r => console.log('products got from useEffect ', r));
    }, []);

    const data = useSelector((state) => state.productList.products);
    const isLoading = useSelector((state) => state.productList.loading);
    const error = useSelector((state) => state.productList.error);
    const quantity = 1;

    async function handleAddToBasket(product) {
        await dispatch(addToBasket(product._id, product.price, quantity, userId));
        await dispatch(getBasket(userId));
    }

    if (isLoading) {
        return <div>Loading ...</div>
    }
    if (error) {
        return <div>Error ! {error}</div>
    }

    return (
        <>
            <h1>Products</h1>

            <Grid container spacing={3}>
                {data.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    height="200"
                                    image={product.image}
                                    title={product.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        ${product.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleAddToBasket(product)}
                                >
                                    Add to Basket
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default ProductsListScreen;