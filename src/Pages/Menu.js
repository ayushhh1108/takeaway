import { Box, Typography, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { json, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import SearchInputWithIcon from "../components/SearchBaar";
import coffee1 from "../assets/menuImages/A Croissant Quest in Paris - Page 4 of 8 - Bake from Scratch.jpeg";
import coffee2 from "../assets/menuImages/Biscoff Cloud Coffee recipe.jpeg";
import coffee3 from "../assets/menuImages/Morning Coffee.jpeg";
import coffee4 from "../assets/menuImages/Coffee for Health - Positive and Negative Effects of Caffeine.jpeg";
import coffee5 from "../assets/menuImages/Dalgona Coffee vs Greek Frappe • Olive & Mango.jpeg";
import coffee6 from "../assets/menuImages/which of the aesthetics that i like are you_.jpeg";
import CheckoutButton from "../components/CheckoutButton";
import "./menu.css";
import CheckoutDialog from "../components/CheckoutDialog";
import { GetCategories, getMenuData } from "./action";

const menuItems = [
  {
    id: 1,
    name: "Espresso",
    price: 150,
    img: coffee1,
    cal: "SHORT (30 mL) 5 kcal",
    label: "Hot",
  },
  {
    id: 2,
    name: "Latte",
    price: 250,
    img: coffee2,
    cal: "SHORT (237 mL) 150 kcal",
    label: "Hot",
  },
  {
    id: 3,
    name: "Cappuccino",
    price: 220,
    img: coffee3,
    cal: "SHORT (237 mL) 120 kcal",
    label: "Hot",
  },
  {
    id: 4,
    name: "Americano",
    price: 180,
    img: coffee4,
    cal: "SHORT (237 mL) 15 kcal",
    label: "Hot",
  },
  {
    id: 5,
    name: "Mocha",
    price: 280,
    img: coffee5,
    cal: "SHORT (237 mL) 200 kcal",
    label: "Hot",
  },
  {
    id: 6,
    name: "Macchiato",
    price: 200,
    img: coffee6,
    cal: "SHORT (237 mL) 100 kcal",
    label: "Hot",
  },
  {
    id: 7,
    name: "Flat White",
    price: 270,
    img: coffee1,
    cal: "SHORT (237 mL) 170 kcal",
    label: "Hot",
  },
  {
    id: 8,
    name: "Iced Latte",
    price: 260,
    img: coffee2,
    cal: "TALL (355 mL) 140 kcal",
    label: "Cold",
  },
  {
    id: 9,
    name: "Iced Americano",
    price: 200,
    img: coffee3,
    cal: "TALL (355 mL) 10 kcal",
    label: "Cold",
  },
  {
    id: 10,
    name: "Iced Mocha",
    price: 300,
    img: coffee4,
    cal: "TALL (355 mL) 250 kcal",
    label: "Cold",
  },
  {
    id: 11,
    name: "Iced Caramel Macchiato",
    price: 320,
    img: coffee5,
    cal: "TALL (355 mL) 230 kcal",
    label: "Cold",
  },
  {
    id: 12,
    name: "Cold Brew",
    price: 220,
    img: coffee6,
    cal: "TALL (355 mL) 5 kcal",
    label: "Cold",
  },
  {
    id: 13,
    name: "Nitro Cold Brew",
    price: 260,
    img: coffee6,
    cal: "TALL (355 mL) 10 kcal",
    label: "Cold",
  },
  {
    id: 14,
    name: "Vanilla Sweet Cream Cold Brew",
    price: 300,
    img: coffee1,
    cal: "TALL (355 mL) 100 kcal",
    label: "Cold",
  },
  {
    id: 15,
    name: "Affogato",
    price: 330,
    img: coffee2,
    cal: "SHORT (118 mL) 150 kcal",
    label: "Hot",
  },
  {
    id: 16,
    name: "Espresso Con Panna",
    price: 170,
    img: coffee3,
    cal: "SHORT (118 mL) 50 kcal",
    label: "Hot",
  },
  {
    id: 17,
    name: "Iced Flat White",
    price: 280,
    img: coffee4,
    cal: "TALL (355 mL) 170 kcal",
    label: "Cold",
  },
  {
    id: 18,
    name: "Pumpkin Spice Latte",
    price: 300,
    img: coffee5,
    cal: "TALL (355 mL) 310 kcal",
    label: "Hot",
  },
  {
    id: 19,
    name: "Toffee Nut Latte",
    price: 310,
    img: coffee6,
    cal: "TALL (355 mL) 290 kcal",
    label: "Hot",
  },
  {
    id: 20,
    name: "Iced Vanilla Latte",
    price: 270,
    img: coffee1,
    cal: "TALL (355 mL) 190 kcal",
    label: "Cold",
  },
  {
    id: 21,
    name: "Honey Almond Milk Cold Brew",
    price: 310,
    img: coffee2,
    cal: "TALL (355 mL) 50 kcal",
    label: "Cold",
  },
  {
    id: 22,
    name: "Cinnamon Dolce Latte",
    price: 320,
    img: coffee3,
    cal: "TALL (355 mL) 340 kcal",
    label: "Hot",
  },
  {
    id: 23,
    name: "Caramel Latte",
    price: 290,
    img: coffee4,
    cal: "TALL (355 mL) 240 kcal",
    label: "Hot",
  },
  {
    id: 24,
    name: "Iced Caramel Latte",
    price: 300,
    img: coffee5,
    cal: "TALL (355 mL) 200 kcal",
    label: "Cold",
  },
  {
    id: 25,
    name: "White Chocolate Mocha",
    price: 310,
    img: coffee5,
    cal: "TALL (355 mL) 400 kcal",
    label: "Hot",
  },
  {
    id: 26,
    name: "Iced White Chocolate Mocha",
    price: 330,
    img: coffee6,
    cal: "TALL (355 mL) 370 kcal",
    label: "Cold",
  },
  {
    id: 27,
    name: "Chai Tea Latte",
    price: 240,
    img: coffee2,
    cal: "TALL (355 mL) 210 kcal",
    label: "Hot",
  },
  {
    id: 28,
    name: "Matcha Green Tea Latte",
    price: 260,
    img: coffee4,
    cal: "TALL (355 mL) 230 kcal",
    label: "Hot",
  },
  {
    id: 29,
    name: "Iced Matcha Latte",
    price: 270,
    img: coffee1,
    cal: "TALL (355 mL) 210 kcal",
    label: "Cold",
  },
  {
    id: 30,
    name: "Double Chocolate Chip Frappuccino",
    price: 340,
    img: coffee3,
    cal: "TALL (355 mL) 410 kcal",
    label: "Cold",
  },
];
const coffeeAndDessertTypes = [
  "Hot",
  "Cold",
  "Frappe",
  "Mocha",
  "Espresso",
  "Latte",
  "Cappuccino",
  "Americano",
  "Macchiato",
  "Flat White",
  "Cold Brew",
  "Nitro Cold Brew",
  "Affogato",
  "Con Panna",
  "Caramel",
  "Vanilla",
  "Matcha",
  "Chai",
  "Pumpkin Spice",
  "White Chocolate",
  "Frappuccino",
  "Chocolate",
  "Toffee Nut",
  "Hazelnut",
  "Dessert",
  "Pastry",
  "Croissant",
  "Muffin",
  "Brownie",
  "Cookie",
  "Tiramisu",
  "Cheesecake",
  "Macaron",
  "Donut",
];

const MenuPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [listMenu, setListMenu] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [checkoutDrawer, setCheckoutDrawer] = useState(false);
  const store = useSelector((store) => store?.Reducer);

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
      console.log("removeItem", prevCart);
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

  const MenuBox = styled(Box)({
    backgroundColor: "#0000002e",
    borderRadius: "40px 0px 0% 0%",
  });

  const onGetMyCoffee = () => {
    setCheckoutDrawer(true);
  };

  const handleClose = (latestCartItems) => {
    setCheckoutDrawer(false);
    setCartItems(latestCartItems);
  };

  useEffect(() => {
    dispatch(GetCategories());
    dispatch(getMenuData());
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCartItems(cart ?? []);
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

  console.log("store", store);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value; 

    if (searchValue) {
      setListMenu(
        store?.menuData?.filter((item) =>
          Object.values(item)?.some((fieldValue) =>
            fieldValue
              ?.toString()
              ?.toLowerCase()
              ?.includes(searchValue?.toLowerCase())
          )
        )
      );
    } else {
      setListMenu(store?.menuData);
    }
    setSearch(searchValue);
  };

  return (
    <OrderSelectionBlock className="menu-page">
      <CheckoutDialog
        addItem={addItem}
        removeItem={removeItem}
        handleClose={handleClose}
        open={checkoutDrawer}
        selectedItems={cartItems}
      />
      <CheckoutButton onGetMyCoffee={onGetMyCoffee} />
      <SearchInputWithIcon
        handleSearchChange={handleSearchChange}
        value={search}
      />
      <MenuBox className="menu-box-container">
        <Box
          className="categories"
          style={{
            display: "flex",
            overflowX: "auto",
            padding: "10px",
            gap: "10px", // Spacing between categories
            scrollbarWidth: "none", // Hide scrollbar for Firefox
            msOverflowStyle: "none", // Hide scrollbar for IE/Edge
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
    </OrderSelectionBlock>
  );
};
export default MenuPage;
