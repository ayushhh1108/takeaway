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

const CheckoutDialog = ({ handleClose, open, removeItem, alreadyInn }) => {
  return (
    <Dialog fullWidth onClose={handleClose} open={open} className="checkout-dialog">
      <Typography className="main-title">
        Just One Sip Away: Final Order Review
      </Typography>
      <Box>
        <CheckoutCard
          item={{
            id: 1,
            name: "Espresso",
            price: 150,
            img: coffee1,
            cal: "SHORT (30 mL) 5 kcal",
            label: "Hot",
          }}
        />
      </Box>
    </Dialog>
  );
};
export default CheckoutDialog;
