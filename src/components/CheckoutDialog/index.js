import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Typography,
} from "@mui/material";
import "./index.css";
import CheckoutCard from "../checkoutCard";
import coffee1 from "../../assets/menuImages/Biscoff Cloud Coffee recipe.jpeg";
import { useState } from "react";

const CheckoutDialog = ({ handleClose, open, selectedItems }) => {
  const [cartItems, setCartItems] = useState(selectedItems);
  const addItem = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
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
      const existingItem = prevCart.find(
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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  return (
    <Dialog
      fullWidth
      onClose={() => handleClose(cartItems)}
      open={open}
      className="checkout-dialog"
    >
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
          <Typography style={{ textAlign: "center" }}>Empty Cart</Typography>
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
          <Typography className="confirm-button">
            Sip Happens – Confirm Now
          </Typography>
        </Box>
      )}
    </Dialog>
  );
};
export default CheckoutDialog;
