import { useNavigate } from "react-router-dom";
// import { Button } from "semantic-ui-react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";

const LoginLogout = () => {
  const navigate = useNavigate();
  const current_user = useSelector(selectUser);
  const isLogged = current_user.id !== 0;

  const handleClick = () => {
    if (isLogged) {
      document.cookie = "loggedIn=false;max-age=0";
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return <Button onClick={handleClick}>{isLogged ? "Logout": "Login"}</Button>;
};

export default LoginLogout;
