import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

type LoginData = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  returnTo?: string;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: localStorage.getItem("lastEmail") ?? "",
    password: "",
  });
  const navigate = useNavigate();

  const submitLogin = () => {
    console.log(loginData);
    if (loginData) {
      localStorage.setItem("lastEmail", loginData.email); // save email to storage
      document.cookie = "loggedIn=true;max-age=60*1000"; // set cookie to expire
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
