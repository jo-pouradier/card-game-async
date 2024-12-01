import { Container, Segment } from "semantic-ui-react";
import { UserForm } from "../components/user/components/UserForm";
import { useNavigate } from "react-router-dom";

export const UserRegister = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Segment>
        <UserForm redirect={() => navigate("/")} />
      </Segment>
    </Container>
  );
};
