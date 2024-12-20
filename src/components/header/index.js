import { Link, useNavigate } from "react-router-dom";
import Mainlogo from "../../assets/logopngs.png";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { AiOutlineMenu } from "react-icons/ai";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconContext } from "react-icons";
import { SwipeableDrawer } from "@mui/material";

const drawerWidth = 240;
const navItems = ["Home", "Privacy Policy", "Contact Us"];
const navItems2 = ["", "Privacy-Policy", "contact-us"];

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />
      <List>
        {navItems.map((item, index) =>
          item === "Contact Us" ? (
            <a href={`#contact-us`}>
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            </a>
          ) : (
            <Link to={`/${navItems2[index]}`}>
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex", pb: 10 }} className="!bg-[#eee3cf]">
      <CssBaseline />
      <AppBar component="nav" className="!bg-[#eee3cf]">
        <Toolbar className="justify-between">
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "#484756",
              fontSize: "28px",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            TAKE <span className="text-[#5a5869]">A</span> WAY
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <IconContext.Provider value={{ color: "#000000" }}>
              <AiOutlineMenu />
            </IconContext.Provider>
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) =>
              item === "Contact Us" ? (
                <a href={`#${navItems2[index]}`}>
                  <Button className="!normal-case" key={item}>
                    {item}
                  </Button>
                </a>
              ) : (
                <Link to={`/${navItems2[index]}`}>
                  <Button className="!normal-case" key={item}>
                    {item}
                  </Button>
                </Link>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <SwipeableDrawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "100% !important",
              borderRadius: "20px 0px 0px 20px !important",
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Box>
    </Box>
  );
}
export default Header;
