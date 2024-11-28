import { UserSimpleDisplay } from "../components/UserSimpleDisplay";
import { UserShortDisplay } from "../components/UserShortDisplay";
import { useSelector } from "react-redux";

const FULL_LABEL = "FULL";
const SHORT_LABEL = "SHORT";

const User = (props) => {
  let current_user = useSelector((state) => state.userReducer.user);
  let display = "";
  switch (props.display_type) {
    case SHORT_LABEL:
      display = (
        <UserShortDisplay
          surname={current_user.surname}
          lastname={current_user.lastname}
          img={current_user.img}
          money={current_user.money}
        ></UserShortDisplay>
      );

      break;
    case FULL_LABEL:
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
