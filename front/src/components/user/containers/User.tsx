import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import IUser from "../../../types/IUser";
import { UserDisplayLabelEnums } from "../../../types/UserDisplayLabelEnums";
import { UserShortDisplay } from "../components/UserShortDisplay";
import { UserSimpleDisplay } from "../components/UserSimpleDisplay";

export interface UserProps extends IUser {
  display_type: UserDisplayLabelEnums;
}

const User = (props: UserProps) => {
  const current_user: IUser = useSelector(selectUser);
  let display: JSX.Element = <></>;
  switch (props.display_type) {
    case UserDisplayLabelEnums.SHORT:
      display = (
        <UserShortDisplay
          surname={current_user.surname}
          lastname={current_user.lastname}
          img={current_user.img}
          money={current_user.money}
        ></UserShortDisplay>
      );

      break;
    case UserDisplayLabelEnums.FULL:
      display = (
        <UserSimpleDisplay
          id={current_user.id}
          surname={current_user.surname}
          lastname={current_user.lastname}
          login={current_user.login}
          pwd={current_user.pwd}
          money={current_user.money}
          img={current_user.img}
        ></UserSimpleDisplay>
      );
      break;
    default:
      display = <h4>No Display Available</h4>;
  }

  return display;
};

export default User;
