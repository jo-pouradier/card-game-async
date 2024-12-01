import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { LoginLogout } from "../login/LoginLogout";

export const Navbar = (_props: unknown) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");

  const createOnClickHandler = (path: string, name: string) => {
    return () => {
      setActiveItem(name);
      navigate(path);
    };
  };
    return (
        <Menu pointing secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={createOnClickHandler("/", "home")}
        ></Menu.Item>
        <Menu.Item
          name="display"
          active={activeItem === "display"}
          onClick={createOnClickHandler("/display", "display")}
        ></Menu.Item>
        <Menu.Item
          name="form"
          active={activeItem === "form"}
          onClick={createOnClickHandler("/form", "form")}
        ></Menu.Item>
        <Menu.Item
          name="shop"
          active={activeItem === "shop"}
          onClick={createOnClickHandler("/shop", "shop")}
        ></Menu.Item>
        <Menu.Item position="right">
          <LoginLogout />
        </Menu.Item>
      </Menu>
    )
}