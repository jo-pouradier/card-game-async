import { Container } from "semantic-ui-react";
import User from "../components/user/containers/User";
import { useAppSelector } from "../hooks";
import { selectUser } from "../slices/userSlice";
import { UserDisplayLabelEnums } from "../types/UserDisplayLabelEnums";

export const Display = (_props: unknown) => {
  const current_user = useAppSelector(selectUser);

  return (
    <Container>
      <User
        id={current_user.id}
        surname={current_user.surname}
        lastname={current_user.lastname}
        login={current_user.login}
        pwd={current_user.pwd}
        money={current_user.money}
        img={current_user.img}
        display_type={UserDisplayLabelEnums.FULL}
      ></User>
    </Container>
  );
};
