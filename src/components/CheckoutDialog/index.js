import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./index.css";
import CheckoutCard from "../checkoutCard";
import coffee1 from "../../assets/menuImages/Biscoff Cloud Coffee recipe.jpeg";
import React, { useState } from "react";
import OrderConfirmation from "../OrderPlaced";
import { useNavigate } from "react-router-dom";

const CheckoutDialog = ({ handleClose, open, selectedItems }) => {
  const [cartItems, setCartItems] = useState(selectedItems);
  const [confirm, setConfirm] = useState(false);
  const [age, setAge] = React.useState("");
  const [processDone, setProcessDone] = useState(false);
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:600px)");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const addItem = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart?.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, count: 1 }];
    });
  };

  const removeItem = (itemId) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart?.find(
        (cartItem) => cartItem.id === itemId.id
      );
      if (existingItem?.count > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId.id
            ? { ...cartItem, count: cartItem.count - 1 }
            : cartItem
        );
      }
      return prevCart.filter((cartItem) => cartItem.id !== itemId.id);
    });
  };

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  const handleConfirm = () => {
    setConfirm(true);
    setProcessDone(false);
  };

  const completeProcess = () => {
    setProcessDone(true);
    setConfirm(false);
  };

  const CartComponent = () => {
    if (confirm) {
      return (
        <Box>
          <Typography className="main-title">Almost Done</Typography>
          <Box>
            <TextField
              id="standard-basic"
              label="Vehical Number"
              className="vehical-no"
              variant="standard"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Payment Method
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>CASH</MenuItem>
                <MenuItem value={20}>ONLINE</MenuItem>
              </Select>
            </FormControl>
            <Typography className="confirm-button" onClick={completeProcess}>
              Seal the Deal
            </Typography>
          </Box>
        </Box>
      );
    } else if (processDone) {
      return (
        <Box className="order-placed">
          <OrderConfirmation handleTrack={handleTrack} />
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography className="main-title">
            Just One Sip Away: Final Order Review
          </Typography>
          <Box>
            {cartItems?.length ? (
              cartItems?.map((item) => (
                <CheckoutCard
                  item={item}
                  addItem={addItem}
                  removeItem={removeItem}
                />
              ))
            ) : (
              <Typography style={{ textAlign: "center" }}>
                Empty Cart
              </Typography>
            )}
          </Box>
          {!!cartItems?.length && (
            <Box className="total-line">
              <Typography className="total">Total</Typography>
              <Typography className="total-price">
                <span
                  style={{
                    fontSize: "12px",
                    color: "#00000096",
                    marginRight: "5px",
                  }}
                >
                  INR
                </span>
                {totalPrice}
              </Typography>
              <Typography className="confirm-button" onClick={handleConfirm}>
                Sip Happens – Confirm Now
              </Typography>
            </Box>
          )}
        </Box>
      );
    }
  };

  const handleTrack = () => {
    navigate("/track/erg");
    setProcessDone(false);
    setConfirm(false);
    handleClose(cartItems);
  };

  if (matches) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        onClose={() => handleClose(cartItems)}
        open={open}
        className={
          processDone ? "checkout-drawer order-placed" : "checkout-drawer"
        }
      >
        <CartComponent />
      </SwipeableDrawer>
    );
  } else {
    return (
      <Dialog
        fullWidth={!processDone}
        onClose={() => handleClose(cartItems)}
        open={open}
        className={
          processDone ? "checkout-dialog order-placed" : "checkout-dialog"
        }
      >
        <CartComponent />
      </Dialog>
    );
  }
};
export default CheckoutDialog;
