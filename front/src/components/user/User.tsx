import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import IUser from "../../types/IUser";
import { UserDisplayLabelEnums } from "../../types/UserDisplayLabelEnums";
import  UserShortDisplay  from "./UserShortDisplay";
import  UserSimpleDisplay  from "./UserSimpleDisplay";

export interface UserProps {
  display_type: UserDisplayLabelEnums;
}

const User = (props: UserProps) => {
  const current_user: IUser = useSelector(selectUser);
  let display: JSX.Element = <></>;
  switch (props.display_type) {
    case UserDisplayLabelEnums.SHORT:
      display = (
        <UserShortDisplay
          surname={current_user.surName}
          lastname={current_user.lastName}
          money={current_user.money}
        ></UserShortDisplay>
      );

      break;
    case UserDisplayLabelEnums.FULL:
      display = (
        <UserSimpleDisplay
        {...current_user}
        ></UserSimpleDisplay>
      );
      break;
    default:
      display = <h4>No Display Available</h4>;
  }

  return display;
};

export default User;
