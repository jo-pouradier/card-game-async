import { Container } from "@mui/material";
import User from "../components/user/User";
import { UserDisplayLabelEnums } from "../types/UserDisplayLabelEnums";

export const Display = (_props: unknown) => {

  return (
    <Container>
      <User display_type={UserDisplayLabelEnums.FULL}></User>
    </Container>
  );
};
