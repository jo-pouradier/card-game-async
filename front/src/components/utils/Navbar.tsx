import { AttachMoney } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";
import LoginLogout from "../login/LoginLogout";

const Navbar = (_props: unknown) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");
  const user = useAppSelector(selectUser);

  const createOnClickHandler = (path: string, name: string) => {
    return () => {
      setActiveItem(name);
      navigate(path);
    };
  };

  return (
    <AppBar position="static" color="default" sx={{ marginBottom: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant={activeItem === "home" ? "outlined" : "text"}
            onClick={createOnClickHandler("/", "home")}
          >
            Home
          </Button>
          <Button
            variant={activeItem === "display" ? "outlined" : "text"}
            onClick={createOnClickHandler("/display", "display")}
          >
            Display
          </Button>
          <Button
            variant={activeItem === "form" ? "outlined" : "text"}
            onClick={createOnClickHandler("/form", "form")}
          >
            Form
          </Button>
          <Button
            variant={activeItem === "shop" ? "outlined" : "text"}
            onClick={createOnClickHandler("/shop", "shop")}
          >
            Shop
          </Button>
          <Button
            variant={activeItem === "chat" ? "outlined" : "text"}
            onClick={createOnClickHandler("/chat", "chat")}
          >
            Chat
          </Button>
          <Button
            variant={activeItem === "game" ? "outlined" : "text"}
            onClick={createOnClickHandler("/game/selection", "game")}
          >
            Game
          </Button>
        </Box>
        <Box>
          <div style={{ display: "flex", gap: 1 }}>
            {user.login}
            <AttachMoney />
            <Typography>{user.account ?? 0}</Typography>
          </div>
          <LoginLogout />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
