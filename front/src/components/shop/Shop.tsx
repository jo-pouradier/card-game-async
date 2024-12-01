import { useNavigate } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";

export const Shop = () => {
  const navigate = useNavigate();

  return (
    <Container textAlign="center">
      <Button onClick={() => navigate("create")}>Create</Button>
      <Button onClick={() => navigate("buy")}>Buy</Button>
      <Button onClick={() => navigate("sell")}>Sell</Button>
    </Container>
  );
};
