import { NavLink, useSearchParams } from "react-router-dom";
import { Box, Container, Typography, Link } from "@mui/material";
import { LoginForm } from "../components/login/LoginForm";

export const Login = () => {
  const [queryParams] = useSearchParams();
  console.log("queryParams: ", queryParams);
  const returnTo = queryParams.get("returnTo") ?? "";

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        marginTop: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <LoginForm returnTo={returnTo} />
      </Box>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Don’t have an account?{" "}
        <Link component={NavLink} to="/register" underline="hover">
          Register
        </Link>
      </Typography>
    </Container>
  );
};
