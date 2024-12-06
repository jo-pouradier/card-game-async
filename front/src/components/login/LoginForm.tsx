import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connectUser, getUserById } from "../../api/user";
import { connect_user_action } from "../../slices/userSlice";
import IUser from "../../types/IUser";
import { userSocket } from "../../socket/socket.ts";

interface LoginData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  returnTo?: string;
}

const LoginForm = (props: LoginFormProps) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: localStorage.getItem("lastEmail") ?? "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitLogin = async () => {
    console.log(loginData);
    if (loginData) {
      const id: number = await connectUser({
        username: loginData.email,
        password: loginData.password,
      });
      console.log(id);
      const user: IUser = await getUserById(id);
      console.log(user);
      userSocket(user, dispatch)
      dispatch(connect_user_action({ user: user }));
      navigate("/" + (props.returnTo ?? ""));
    } else {
      console.log("no data");
    }
  };

  const setLoginDataField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" component="h3" gutterBottom textAlign="center">
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        placeholder="Email"
        name="email"
        autoComplete="username"
        onChange={setLoginDataField}
        value={loginData.email}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        placeholder="Password"
        name="password"
        autoComplete="current-password"
        onChange={setLoginDataField}
        value={loginData.password}
      />
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={submitLogin}
      >
        Submit
      </Button>
    </Box>
  );
};

export default LoginForm;
