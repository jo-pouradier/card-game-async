import { useState } from "react";
import { Container, Grid, Segment } from "semantic-ui-react";
import { UserForm } from "../components/userForm/UserForm";
import { useNavigate } from "react-router-dom";
import User from "../components/user/containers/User";
import { UserDisplayLabelEnums } from "../types/UserDisplayLabelEnums";
import IUser from "../types/IUser";

export const FormDisplay = (_props: unknown) => {
  const [currentUser, setCurrentUser] = useState<IUser>({
    id: 12,
    surname: "John",
    lastname: "Doe",
    login: "jDoe",
    pwd: "jdoepwd",
    img: "https://www.nicepng.com/png/full/982-9820051_heart-2352306885-deadpool-png.png",
    money: 1000,
  });

  const navigate = useNavigate();

  // function callbackErr(data: Error) {
  //   console.log(data);
  // }

  function handleChange(data: IUser) {
    console.log(data);
    setCurrentUser({
      id: data.id,
      surname: data.surname,
      lastname: data.lastname,
      login: data.login,
      pwd: data.pwd,
      money: data.money,
      img: data.img,
    });
  }

  function redirectHandler(data: unknown) {
    console.log("user to submit" + data);
    navigate("/display");
  }

  return (
    <Container>
      <Grid divided="vertically">
        <Grid.Row columns={3}>
          <Grid.Column>
            <Segment>
              <UserForm
                handleChange={handleChange}
                redirect={redirectHandler}
              ></UserForm>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <User
              id={currentUser.id}
              surname={currentUser.surname}
              lastname={currentUser.lastname}
              login={currentUser.login}
              pwd={currentUser.pwd}
              money={currentUser.money}
              img={currentUser.img}
              display_type={UserDisplayLabelEnums.FULL}
            ></User>
          </Grid.Column>
          <Grid.Column>
            <User
              id={currentUser.id}
              surname={currentUser.surname}
              lastname={currentUser.lastname}
              login={currentUser.login}
              pwd={currentUser.pwd}
              money={currentUser.money}
              img={currentUser.img}
              display_type={UserDisplayLabelEnums.SHORT}
            ></User>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
