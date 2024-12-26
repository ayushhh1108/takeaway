import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./index.css";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

const ItemCard = ({ item, addItem, removeItem, alreadyInn }) => {
  return (
    <Card className="blog-box card-main item-main-card">
      <CardContent className="card-Content-service">
        <Box className="description-box">
          <Typography variant="h6" className="name">
            {item?.name}
          </Typography>
          <span variant="p" className="cal">
            {item?.calories} Kcal
          </span>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            className="PB-button"
          >
            <span className="d-flex align-items-center blog-date-section">
              <span style={{ color: "green" }}> {item?.price} | </span>{" "}
              {/* <Image src={DateIcon} alt="share-icon" className="me-2" /> */}
              <HistoryToggleOffIcon
                fontSize="small"
                className="time-icon"
              />{" "}
              15s
            </span>
            <Box className="add-remove-button">
              {!alreadyInn?.count && (
                <Typography
                  onClick={() => addItem(item)}
                  className="add-to-cart"
                >
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
                <Typography
                  onClick={() => addItem(item)}
                  className="add-button"
                >
                  +
                </Typography>
              )}
            </Box>
          </div>
          
        </Box>
      </CardContent>
      <CardMedia
        sx={{ height: "100%", width: "125px" }}
        image={`${process.env.REACT_APP_API_BASE_URL}/uploads/${item?.image}`}
        className="service-main-image"
        title="green iguana"
      />
    </Card>
  );
};
export default ItemCard;
