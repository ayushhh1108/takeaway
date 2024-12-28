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
import React, { useEffect, useState } from "react";
import OrderConfirmation from "../OrderPlaced";
import { useNavigate } from "react-router-dom";
import LocalStorageManager from "../../utils/local-storage-manager";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { postOrderCreate } from "../../Pages/action";

const CheckoutDialog = ({ handleClose, open, selectedItems }) => {
  const [cartItems, setCartItems] = useState(selectedItems);
  console.log("selectedItemscartItems", selectedItems, cartItems);
  const [checkOutData, setCheckOutData] = useState();
  const [confirm, setConfirm] = useState(false);
  const [processDone, setProcessDone] = useState(false);
  const [orderId, setOrderId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:600px)");

  const addItem = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart?.find(
        (cartItem) => cartItem.id === item.id
      );
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
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [method, setMethod] = React.useState("");

    const handleChange = (event) => {
      setMethod(event.target.value);
    };

    const handleVehicleNumberChange = (e) => {
      let value = e.target.value.toUpperCase();
      value = value
        .replace(/[^A-Z0-9]/g, "")
        .replace(
          /^([A-Z]{0,2})([0-9]{0,2})([A-Z]{0,2})([0-9]{0,4}).*$/,
          "$1$2$3$4"
        );
      if (
        /^[A-Z]{0,2}[0-9]{0,2}[A-Z]{0,2}[0-9]{0,4}$/.test(value) &&
        value.length <= 10
      ) {
        setVehicleNumber(value);
      }
    };

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
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Payment Method
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={method}
                label="method"
                onChange={handleChange}
              >
                <MenuItem value={"cash"}>CASH</MenuItem>
                <MenuItem value={"online"}>ONLINE</MenuItem>
              </Select>
            </FormControl>
            <Typography
              className="confirm-button"
              onClick={() => {
                const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
                let error = false;
                if (!vehicleNumber || !vehicleRegex.test(vehicleNumber)) {
                  toast.error("Enter Right Vehicle Number");
                  error = true;
                }
                if (!method) {
                  toast.error("Select Payment Method");
                  error = true;
                }
                if (error) {
                  return;
                } else {
                  setCheckOutData({
                    ...checkOutData,
                    carNumber: vehicleNumber,
                    paymentMode: method,
                  });
                  dispatch(
                    postOrderCreate(
                      {
                        ...checkOutData,
                        carNumber: vehicleNumber,
                        paymentMode: method,
                      },
                      completeProcess,
                      setOrderId
                    )
                  );
                }
              }}
            >
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
      console.log("cartItemscartItems", cartItems);
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
              <Typography
                className="confirm-button"
                onClick={() => {
                  setCheckOutData({
                    order: cartItems,
                    userId: LocalStorageManager.getUserData()?.id,
                    total: totalPrice,
                  });
                  handleConfirm();
                }}
              >
                Sip Happens – Confirm Now
              </Typography>
            </Box>
          )}
        </Box>
      );
    }
  };

  const handleTrack = () => {
    navigate(`/track/${orderId}`);
    setProcessDone(false);
    setConfirm(false);
    handleClose(cartItems);
  };

  useEffect(() => {
    setCartItems(selectedItems);
  }, [selectedItems]);

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
