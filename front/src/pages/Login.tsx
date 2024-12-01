import { useSearchParams } from "react-router";
import { Container, Segment } from "semantic-ui-react";
import { LoginForm } from "../components/login/LoginForm";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const [queryParams, _setQueryParams] = useSearchParams();
  const returnTo = queryParams.get("returnTo") ?? "/";
  return (
    <Container>
      <Segment center>
      <LoginForm returnTo={returnTo} />
      <NavLink to="/register">Register</NavLink>
      </Segment>
    </Container>
  );
};
