import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import "./index.css";
import { getOrders, setLoading, stopLoading } from "../action";
import OrderCard from "../../components/OrderCard";
import Loader from "../../components/Loader";

const OrderSelectionBlock = styled(Box)({
  backgroundColor: "white",
  "& .heading-desc-box": {
    color: "white",
    width: "400px",
    textAlign: "left",
    paddingTop: "20px",
    "& .main-h3": {
      fontSize: "36px",
      fontWeight: 700,
    },
    "& .desc": {
      fontSize: "18px",
      marginBottom: "80px",
    },
  },
  "& .sign-up-right": {
    flexWrap: "wrap",
    "& .left-side-form": {
      width: "80%",
      display: "flex",
      flexWrap: "wrap",
      height: "300px",
      alignContent: "space-around",
      "& .input": {
        width: "75%",
        marginBottom: "12px",
      },
      "& .sign-up": {
        fontWeight: 700,
        marginBottom: "28px",
        width: "100%",
      },
      "& .submit-btn": {
        width: "100%",
        "& .submit-text": {
          fontSize: "15px",
          marginBottom: "8px",
        },
        "& .signup-btn": {
          fontSize: "15px",
          fontWeight: 700,
          textDecoration: "none",
        },
      },
    },
  },
});

const MenuBox = styled(Box)({
  backgroundColor: "#0000002e",
  borderRadius: "40px 0px 0% 0%",
});

const HistoryPage = () => {
  const store = useSelector((store) => store?.Reducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const func = async () => {
      dispatch(setLoading()); // Explicitly set loading state
      const ordersData = await dispatch(getOrders());
      setListOrder(ordersData);
      console.log("Fetched Orders Data:", store?.loader, listOrder, ordersData);
      dispatch(stopLoading()); // Explicitly stop loading state
    };
    func();
  }, [dispatch]);

  return (
    <OrderSelectionBlock className="order-history-page ">
      <Box
        style={{
          padding: "30px",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box className="header-history">
          <Typography
            style={{
              fontSize: "26px",
              display: "inline-block",
              paddingLeft: "20px",
            }}
            className="kanit-bold"
          >
            Order History
          </Typography>
          <Typography
            onClick={() => {
              navigate("/menu");
            }}
            className="category"
            style={{ fontSize: "13px", marginLeft: "25px" }}
          >
            Home
          </Typography>
        </Box>
      </Box>
      <MenuBox
        className="order-box-container"
        style={store?.loader ? { padding: "0px" } : {}}
      >
        {!store?.loader ? (
          listOrder?.map((item) => <OrderCard item={item} />)
        ) : (
          <Loader />
        )}
      </MenuBox>
    </OrderSelectionBlock>
  );
};
export default HistoryPage;
