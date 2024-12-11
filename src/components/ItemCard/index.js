import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./index.css";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

const ItemCard = ({ item, addItem, removeItem, alreadyInn }) => {
  console.log("alreadyInn", alreadyInn);
  return (
    <Card className="blog-box card-main">
      <CardMedia
        sx={{ height: 250 }}
        image={item?.img}
        className="service-main-image"
        title="green iguana"
      >
        <Box className="Featured-label-box">
          <Typography className="Featured-label">{item?.label}</Typography>
        </Box>
      </CardMedia>
      <CardContent className="card-Content-service">
        <Box className="description-box">
          <Typography variant="h6" className="name">
            {item?.name}
          </Typography>
          <span variant="p" className="cal">
            {item?.cal}
          </span>
          <span className="d-flex align-items-center blog-date-section">
            <span style={{ color: "green" }}> {item?.price} | </span>{" "}
            {/* <Image src={DateIcon} alt="share-icon" className="me-2" /> */}
            <HistoryToggleOffIcon fontSize="small" /> 15s
          </span>
          {console.log("item", item)}
          <Box className="add-remove-button">
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
export default ItemCard;
