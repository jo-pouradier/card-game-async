import { useSearchParams } from "react-router";
import { Container } from "semantic-ui-react";
import { LoginForm } from "../components/login/LoginForm";

export const Login = () => {
  const [queryParams, _setQueryParams] = useSearchParams();
  const returnTo = queryParams.get("returnTo") ?? "/";
  return (
    <Container>
      <LoginForm returnTo={returnTo} />
    </Container>
  );
};
