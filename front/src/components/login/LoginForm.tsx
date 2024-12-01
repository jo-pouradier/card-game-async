import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Header, InputOnChangeData } from "semantic-ui-react";

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
      localStorage.setItem("lastEmail", loginData.email as string); // save email to storage
      document.cookie = "loggedIn=true;max-age=60*1000"; // set cookie to expire
      navigate("/" + (props.returnTo ?? ""));
    } else {
      console.log("no data");
    }
  };

  const setLoginDataField = (
    _event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) => {
    setLoginData({
      ...loginData,
      [data.name]: data.value,
    });
  };

  return (
    <Form>
      <Header as="h3" dividing>
        Login
      </Header>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Email"
          placeholder="Email"
          name="email"
          autoComplete="username"
          onChange={setLoginDataField}
          value={loginData.email}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          autoComplete="current-password"
          onChange={setLoginDataField}
          value={loginData.password}
        />
      </Form.Group>
      <Button type="submit" onClick={submitLogin}>
        Submit
      </Button>
    </Form>
  );
};
