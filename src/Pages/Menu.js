import { Box, Tooltip, Typography, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import CheckoutButton from "../components/CheckoutButton";
import "./menu.css";
import CheckoutDialog from "../components/CheckoutDialog";
import { GetCategories, getMenuData, setLoading, stopLoading } from "./action";
import { Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import Loader from "../components/Loader";
import LocalStorageManager from "../utils/local-storage-manager";
const OrderSelectionBlock = styled(Box)({
  backgroundColor: "white",
  minHeight: "100dvh",
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

const MenuPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [listMenu, setListMenu] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [checkoutDrawer, setCheckoutDrawer] = useState(false);
  const store = useSelector((store) => store?.Reducer);
  const matches = useMediaQuery("(max-width:600px)");

  const addItem = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart?.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        const existingData = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        );
        LocalStorageManager.setLocalStorage("cart", existingData);
        return existingData;
      }
      const notExisting = [...prevCart, { ...item, count: 1 }];
      LocalStorageManager.setLocalStorage("cart", notExisting);
      return notExisting;
    });
  };

  const removeItem = (itemId) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart?.find(
        (cartItem) => cartItem.id === itemId.id
      );
      if (existingItem?.count > 1) {
        const existingData = prevCart.map((cartItem) =>
          cartItem.id === itemId.id
            ? { ...cartItem, count: cartItem.count - 1 }
            : cartItem
        );
        LocalStorageManager.setLocalStorage("cart", existingData);
        return existingData;
      }
      const notExisting = prevCart.filter(
        (cartItem) => cartItem.id !== itemId.id
      );
      LocalStorageManager.setLocalStorage("cart", notExisting);
      return notExisting;
    });
  };

  const onGetMyCoffee = () => {
    setCheckoutDrawer(true);
  };

  const handleClose = (latestCartItems) => {
    console.log("latestCartItems", latestCartItems);
    setCheckoutDrawer(false);
    setCartItems(latestCartItems);
  };

  useEffect(() => {
    const func = async () => {
      await dispatch(GetCategories());
      await dispatch(getMenuData());
      const cart = await JSON.parse(localStorage.getItem("cart"));
      setCartItems(cart ?? []);
    };
    func();
  }, []);

  useEffect(() => {
    setListMenu(store?.menuData ? store?.menuData : []);
  }, [store]);

  useEffect(() => {
    if (category) {
      setListMenu(
        store?.menuData?.filter(
          (menu) =>
            menu.categoryId ===
            store?.Categories?.find((cat) => cat?.name === category)?.id
        )
      );
    } else {
      setListMenu(store?.menuData);
    }
  }, [category]);

  useEffect(() => {
    if (search) {
      setListMenu(
        store?.menuData?.filter((item) =>
          Object.values(item)?.some((fieldValue) =>
            fieldValue
              ?.toString()
              ?.toLowerCase()
              ?.includes(search?.toLowerCase())
          )
        )
      );
    } else {
      setListMenu(store?.menuData);
    }
  }, [search]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  console.log("cartItems", store?.loader);

  return (
    <OrderSelectionBlock className="menu-page">
      <CheckoutDialog
        addItem={addItem}
        removeItem={removeItem}
        handleClose={handleClose}
        open={checkoutDrawer}
        selectedItems={cartItems}
      />
      {store?.loader && <Loader />}
      {!store?.loader && <CheckoutButton onGetMyCoffee={onGetMyCoffee} />}
      {!store?.loader && (
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
              House Of Huegah
            </Typography>
            {matches && (
              <Typography
                onClick={() => {
                  navigate("/order-history");
                }}
                className="category"
                style={{ fontSize: "13px", marginLeft: "25px" }}
              >
                <Tooltip title="History">
                  <HistoryIcon />
                </Tooltip>
              </Typography>
            )}
          </Box>
          <Box
            style={{
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
            className="search-box"
          >
            <Input
              className="search-input"
              placeholder="Search"
              style={{ width: "200px" }}
              value={search}
              onChange={handleSearchChange}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
            {!matches && (
              <Typography
                onClick={() => {
                  navigate("/order-history");
                }}
                className="category"
                style={{ fontSize: "13px", marginLeft: "25px" }}
              >
                <Tooltip title="History">
                  <HistoryIcon />
                </Tooltip>
              </Typography>
            )}
          </Box>
        </Box>
      )}
      {!store?.loader && (
        <MenuBox className="menu-box-container">
          <Box
            className="categories"
            style={{
              display: "flex",
              overflowX: "auto",
              padding: "10px",
              gap: "10px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <Typography
              onClick={() => {
                setCategory("");
              }}
              className={!category ? "category active-category" : "category"}
              style={{ fontSize: "14px" }}
            >
              All
            </Typography>
            {store?.Categories?.map((f) => (
              <Typography
                className={
                  category === f?.name ? "category active-category" : "category"
                }
                onClick={() => {
                  setCategory(f?.name);
                }}
                style={{ fontSize: "14px" }}
              >
                {f?.name}
              </Typography>
            ))}
          </Box>
          {listMenu?.map((item) => (
            <ItemCard
              item={item}
              addItem={addItem}
              removeItem={removeItem}
              alreadyInn={cartItems?.find((i) => i.id === item.id)}
            />
          ))}
        </MenuBox>
      )}
    </OrderSelectionBlock>
  );
};
export default MenuPage;
