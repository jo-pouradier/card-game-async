import { useState } from "react";
import { Container, Grid, Segment } from "semantic-ui-react";
// import { UserForm } from "../components/userForm/UserForm";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../components/user/components/UserForm";
import User from "../components/user/containers/User";
import IUser from "../types/IUser";
import { UserDisplayLabelEnums } from "../types/UserDisplayLabelEnums";

export type FormDisplayProps = {
  id?: number;
};

export const FormDisplay = (props: FormDisplayProps) => {
  const [user, _setCurrentUser] = useState<IUser>({
    id: 12,
    surname: "John",
    lastname: "Doe",
    email: "jDoe@example.fr",
    password: "jdoepwd",
    money: 1000,
  });
  const navigate = useNavigate();

  // function callbackErr(data: Error) {
  //   console.log(data);
  // }

  function redirectHandler(data: IUser) {
    console.log("user to submit" + data);
    navigate("/display");
  }

  const id = props.id ?? -1;
  let content;
  switch (id) {
    case -1:
      content = (
        <Container>
          <Grid divided="vertically">
            <Grid.Row columns={3}>
              <Grid.Column>
                <Segment>
                  <UserForm redirect={redirectHandler}></UserForm>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <User
                  id={user.id}
                  surname={user.surname}
                  lastname={user.lastname}
                  email={user.email}
                  password={user.password}
                  money={user.money}
                  display_type={UserDisplayLabelEnums.FULL}
                ></User>
              </Grid.Column>
              <Grid.Column>
                <User
                  id={user.id}
                  surname={user.surname}
                  lastname={user.lastname}
                  email={user.email}
                  password={user.password}
                  money={user.money}
                  display_type={UserDisplayLabelEnums.SHORT}
                ></User>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
      break;
    case 2:
      content = (
        <Container>
          <Segment>
            <UserForm redirect={redirectHandler} />
          </Segment>
        </Container>
      );
      break;
    default:
      content = <div>Invalid id</div>;
  }
  return content;
};
