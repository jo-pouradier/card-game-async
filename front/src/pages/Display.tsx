import { useSelector } from "react-redux";
import User from "../components/user/containers/User";
import { Container } from "semantic-ui-react";
import IUser from "../types/IUser";
import { UserDisplayLabelEnums } from "../types/UserDisplayLabelEnums";
import { RootState } from "../store";

export const Display = (_props: unknown) => {
  const current_user: IUser = useSelector(
    (state: RootState) => state.userReducer.user as IUser
  );

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
