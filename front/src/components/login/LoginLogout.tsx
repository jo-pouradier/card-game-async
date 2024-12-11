import { useNavigate } from "react-router-dom";
// import { Button } from "semantic-ui-react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addNotification } from "../../slices/notificationSlice";
import { delete_user_action, selectUser } from "../../slices/userSlice";

const LoginLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const current_user = useAppSelector(selectUser) ?? { id: 0 };
  const isLogged = current_user.id !== 0;

  const handleClick = () => {
    if (isLogged) {
      dispatch(delete_user_action());
      navigate("/");
      dispatch(
        addNotification({
          id: Math.random() * 100,
          message: "Logged out",
          severity: "info",
        }),
      );
    } else {
      navigate("/login");
    }
  };

  return <Button onClick={handleClick}>{isLogged ? "Logout" : "Login"}</Button>;
};

export default LoginLogout;
