import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {getBasket} from '../redux/actions/basketActions';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Box,
} from '@material-ui/core';
import IndexNavbar from '../components/ReusableComponents/components/Navbars/IndexNavbar'
import BasketPage from "./BasketPage";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(2),
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    button: {
        width: '100%',
        maxWidth: 250,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        height: '100vh',
    },
}));

function Checkout() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let userId = useSelector((state) => state.auth.user.id);
    //const basket = useSelector((state) => state.basket);

    const [payMethod, setPayMethod] = useState('bank');

    async function getExistingBasket() {
        await dispatch(getBasket(userId));
    }

    useEffect(() => {
        getExistingBasket().then(r => console.log('basket got ', r))
    }, [dispatch, userId]);

    let {basket, loading, error, basketItems} = useSelector(
        (state) => state.basket
    );
    console.log(basket)

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate payMethod and submit the form
    };

    const handlePaymentMethodChange = (event) => {
        setPayMethod(event.target.value);
    };

    return (
        <div className={classes.formContainer} style={{marginTop: 5 + 'em'}}>
            {/* <BasketPage/> */}
            {/* Basket Items */}
            <IndexNavbar/>

            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>{error}</h2>
            ) : basket != null ? (
                <div style={{marginTop: 10 + 'em'}}>
                    <h2>Basket</h2>
                    {basket.products && (
                        <ul>
                            {basket.products.map((product) => (
                                <li key={product._id}>
                                    {product.name} x {product.quantity} = TND
                                    {product.price * product.quantity}
                                </li>
                            ))}
                            <li>total price : {basket.totalPrice}</li>
                        </ul>
                    )}
                    <p>Total price: TND {basket.totalPrice}</p>
                </div>
            ) : (
                <div>hello</div>
            )}

            {/* End Basket Items  */}


            <p>Selected payment method: {payMethod}</p>
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Choose Payment Method</FormLabel>
                    <RadioGroup
                        aria-label="payment-method"
                        name="payment-method"
                        value={payMethod}
                        onChange={handlePaymentMethodChange}
                    >
                        <FormControlLabel
                            value="bank"
                            control={<Radio/>}
                            label="Pay with Bank Card"
                        />
                        <FormControlLabel
                            value="delivery"
                            control={<Radio/>}
                            label="Pay on Delivery"
                        />
                    </RadioGroup>
                </FormControl>
                <Box className={classes.buttonContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                    >
                        Submit Order
                    </Button>
                </Box>
            </form>
        </div>
    );
}

export default Checkout;