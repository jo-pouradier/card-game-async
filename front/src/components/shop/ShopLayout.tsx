import { ReactNode } from "react";
import { Container, Header } from "semantic-ui-react";

export type ShopLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const ShopLayout = (props: ShopLayoutProps) => {
  console.log("call ShopLayout with children: ", props.children);
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
