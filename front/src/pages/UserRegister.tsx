import { Container, Paper } from "@mui/material";
import UserForm from "../components/user/UserForm";

const UserRegister = () => {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <UserForm />
      </Paper>
    </Container>
  );
};

export default UserRegister;
