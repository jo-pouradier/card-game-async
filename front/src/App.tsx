import { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Menu, MenuItem } from "semantic-ui-react";
import { LoginLogout } from "./components/login/LoginLogout";
import {
  ShopBuyDisplay,
  ShopCreateDisplay,
  ShopDisplay,
  ShopSellDisplay,
} from "./components/shop";
import { Display } from "./pages/Display";
import { FormDisplay } from "./pages/FormDisplay";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { store } from "./store";

export const App = (_props: unknown) => {
  const [activeItem, setActiveItem] = useState("home");
  const linkStyle = { color: "black" };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Menu pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={() => setActiveItem("home")}
          >
            <NavLink to="/" style={linkStyle}>
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item
            name="display"
            active={activeItem === "display"}
            onClick={() => setActiveItem("display")}
          >
            <NavLink to="/display" style={linkStyle}>
              Display
            </NavLink>
          </Menu.Item>
          <Menu.Item
            name="form"
            active={activeItem === "form"}
            onClick={() => setActiveItem("form")}
          >
            <NavLink to="/form" style={linkStyle}>
              {" "}
              Form
            </NavLink>
          </Menu.Item>
          <Menu.Item
            name="formUser"
            active={activeItem === "formUser"}
            onClick={() => setActiveItem("formUser")}
          >
            <NavLink to="/form2" style={linkStyle}>
              {" "}
              Form2
            </NavLink>
          </Menu.Item>
          <Menu.Item
            name="shop"
            active={activeItem === "shop"}
            onClick={() => setActiveItem("shop")}
          >
            <NavLink to="/shop" style={linkStyle}>
              {" "}
              Shop
            </NavLink>
          </Menu.Item>
          <MenuItem position="right">
            <LoginLogout />
          </MenuItem>
        </Menu>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/shop">
              <Route index element={<ShopDisplay />} />
              <Route path="create" element={<ShopCreateDisplay />} />
              <Route path="buy" element={<ShopBuyDisplay />} />
              <Route path="sell" element={<ShopSellDisplay />} />
            </Route>

            <Route path="/display" element={<Display />} />
            <Route path="/form" element={<FormDisplay />} />
            <Route path="/form2" element={<FormDisplay id={2} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};
