import { useState } from "react";
import { Container, Grid, Segment } from "semantic-ui-react";
import User from "../components/user/containers/User";
import { UserForm } from "../components/userform/UserForm";
import { useNavigate } from "react-router-dom";

export const FormDisplay = (props) => {
  const [currentUser, setCurrentUser] = useState({
    id: 12,
    surname: "John",
    lastname: "Doe",
    login: "jDoe",
    pwd: "jdoepwd",
    img: "https://www.nicepng.com/png/full/982-9820051_heart-2352306885-deadpool-png.png",
    money: 1000,
  });
  const navigate = useNavigate();
  function callbackErr(data) {
    console.log(data);
  }

  function handleChange(data) {
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

  function redirectHandler(data) {
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
              display_type="FULL"
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
              display_type="SHORT"
            ></User>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
