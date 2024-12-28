import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./index.css";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Card className="blog-box card-main item-main-card">
      <CardContent
        className="card-Content-service w-full	"
        onClick={() => navigate(`/track/${item?.id}`)}
      >
        <Box className="description-box">
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" className="name">
              #{item?.id}
            </Typography>
            <span variant="p" className="cal">
              {item?.carNumber}
            </span>
          </Box>
          <span variant="p" className="cal">
            <ol className="list-decimal">
              {item?.order?.map((i) => (
                <li key={i?.name}>
                  {i?.name} {`(${i.count})`}
                </li>
              ))}
            </ol>
          </span>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            className="PB-button"
          >
            <span className="d-flex align-items-center blog-date-section">
              <span style={{ color: "green" }}> {item?.total} | </span>{" "}
              {/* <Image src={DateIcon} alt="share-icon" className="me-2" /> */}
              <PaymentsIcon fontSize="small" className="time-icon" />{" "}
              {item?.paymentMode}
            </span>
            <Box
              className={
                item.status === "Completed"
                  ? "status-button bg-green-100"
                  : item.status === "Preparing"
                  ? "status-button bg-orange-100"
                  : item.status === "Rejected"
                  ? "status-button bg-red-100"
                  : "status-button bg-yellow-100"
              }
            >
              <Typography
                onClick={() => console.log(item)}
                className={"status"}
              >
                {item.status}
              </Typography>
            </Box>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};
export default OrderCard;
