import React from "react";
import { Button } from "@mui/material";

const CheckoutButton = ({ onGetMyCoffee }) => {
  const buttonStyles = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
    backgroundColor: "#FF6F00", // Bright Orange
    color: "#FFFFFF", // White text
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s",
    cursor: "pointer",
  };

  const hoverStyles = {
    backgroundColor: "#E65A00", // Darker orange on hover
  };

  return (
    <Button
      style={buttonStyles}
      variant="contained"
      onClick={onGetMyCoffee}
      onMouseOver={(e) =>
        (e.target.style.backgroundColor = hoverStyles.backgroundColor)
      }
      onMouseOut={(e) =>
        (e.target.style.backgroundColor = buttonStyles.backgroundColor)
      }
    >
      Get My Coffee
    </Button>
  );
};

export default CheckoutButton;
