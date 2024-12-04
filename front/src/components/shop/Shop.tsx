import { useNavigate } from "react-router-dom";
// import { Button, Container } from "semantic-ui-react";
import { Button, Container, Grid2 as Grid } from "@mui/material";

export const Shop = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container gap={12}>
        <Grid size="grow">
          <Button variant="contained" onClick={() => navigate("create")}>
            Create
          </Button>
        </Grid>
        <Grid size="grow">
          <Button variant="contained" onClick={() => navigate("buy")}>
            Buy
          </Button>
        </Grid>
        <Grid size="grow">
          <Button variant="contained" onClick={() => navigate("sell")}>
            Sell
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
