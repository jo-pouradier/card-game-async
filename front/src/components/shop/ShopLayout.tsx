import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";

export type ShopLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const ShopLayout = (props: ShopLayoutProps) => {
  console.log("call ShopLayout");
  const navigate = useNavigate();
  // verify the user is logged in from cookie
  useEffect(() => {
    if (!document.cookie.includes("loggedIn=true")) {
      navigate("/login?returnTo=shop");
    }
  }, [navigate]);

  const title = props.title ?? "Shop";
  return (
    <Container>
      <Header as="h1" textAlign="center">
        {title}
      </Header>
      {props.children}
    </Container>
  );
};
