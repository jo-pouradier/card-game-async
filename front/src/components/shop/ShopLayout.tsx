import { ReactNode } from "react";
import { Container, Typography } from "@mui/material";

export interface ShopLayoutProps {
  children: ReactNode;
  title?: string;
}

const ShopLayout = (props: ShopLayoutProps) => {
  console.log("call ShopLayout with children: ", props.children);
  const title = props.title ?? "Shop";

  return (
    <Container>
      <Typography variant="h2" align="center">
        {title}
      </Typography>
      {props.children}
    </Container>
  );
};

export default ShopLayout;
