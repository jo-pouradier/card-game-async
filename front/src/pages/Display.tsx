import { Container } from "@mui/material";
import User from "../components/user/User";
import { useAppSelector } from "../hooks";
import { selectUser } from "../slices/userSlice";
import { UserDisplayLabelEnums } from "../types/UserDisplayLabelEnums";

export const Display = (_props: unknown) => {
  const current_user = useAppSelector(selectUser);

  return (
    <Container>
      <User {...current_user} display_type={UserDisplayLabelEnums.FULL}></User>
    </Container>
  );
};
