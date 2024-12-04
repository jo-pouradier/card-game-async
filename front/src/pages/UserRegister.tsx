import { Container, Paper } from "@mui/material";
import { UserForm } from "../components/user/UserForm";
import { useNavigate } from "react-router-dom";

export const UserRegister = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <UserForm redirect={() => navigate("/")} />
      </Paper>
    </Container>
  );
};
