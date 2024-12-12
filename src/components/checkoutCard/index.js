import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./index.css";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

const CheckoutCard = ({ item, addItem, removeItem, alreadyInn }) => {
  console.log("alreadyInn", alreadyInn);
  return (
    <Card className="Checkout-box card-main">
      <CardMedia
        sx={{ height: 80, width: 80 }}
        image={item?.img}
        className="service-main-image"
        title="green iguana"
      />
      <CardContent className="card-Content-Checkout">
        <Box className="description-box">
          <Typography variant="h6" className="name">
            {item?.name}
          </Typography>
          <span variant="p" className="cal">
            {item?.cal}
          </span>
          {console.log("item", item)}
        </Box>
        <Box className="right-side-pricing">
          <Box className="d-flex align-items-center ">
            <span className="checkout-price-section" style={{ color: "green" }}> {item?.price} </span>{" "}
          </Box>
          <Box className="add-remove-button-checkout">
            {!alreadyInn?.count && (
              <Typography onClick={() => addItem(item)} className="add-to-cart">
                Add to Cart
              </Typography>
            )}
            {alreadyInn?.count && (
              <Typography
                onClick={() => removeItem(item)}
                className="remove-button"
              >
                -
              </Typography>
            )}
            {alreadyInn?.count && (
              <Typography className="count-cart">
                {alreadyInn?.count}
              </Typography>
            )}
            {alreadyInn?.count && (
              <Typography onClick={() => addItem(item)} className="add-button">
                +
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default CheckoutCard;
