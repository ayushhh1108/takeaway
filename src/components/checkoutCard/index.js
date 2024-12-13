import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./index.css";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

const CheckoutCard = ({ item, addItem, removeItem }) => {
  return (
    <Card className="Checkout-box card-main">
      <CardMedia
        sx={{ height: 85, width: 85 }}
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
          <span className="d-flex align-items-center blog-date-section">
            <span style={{ color: "green" }}> {item?.price} </span>{" "}
          </span>
        </Box>
        <Box className="right-side-pricing">
          <Box className="d-flex align-items-center ">
            <span className="checkout-price-section" style={{ color: "green" }}>
              {" "}
              + {item?.price * item?.count}{" "}
            </span>{" "}
          </Box>
          <Box className="add-remove-button-checkout">
            {!item?.count && (
              <Typography onClick={() => addItem(item)} className="add-to-cart">
                Add to Cart
              </Typography>
            )}
            {item?.count && (
              <Typography
                onClick={() => removeItem(item)}
                className="remove-button"
              >
                -
              </Typography>
            )}
            {item?.count && (
              <Typography className="count-cart">{item?.count}</Typography>
            )}
            {item?.count && (
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
