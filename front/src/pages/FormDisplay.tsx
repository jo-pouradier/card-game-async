import { useState } from "react";
import { Container, Grid, Paper, Box } from "@mui/material";
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

  function redirectHandler(data: IUser) {
    console.log("user to submit", data);
    navigate("/display");
  }

  const id = props.id ?? -1;

  let content;
  switch (id) {
    case -1:
      content = (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3}>
                <Box p={2}>
                  <UserForm redirect={redirectHandler} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3}>
                <Box p={2}>
                  <User
                    id={user.id}
                    surname={user.surname}
                    lastname={user.lastname}
                    email={user.email}
                    password={user.password}
                    money={user.money}
                    display_type={UserDisplayLabelEnums.FULL}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3}>
                <Box p={2}>
                  <User
                    id={user.id}
                    surname={user.surname}
                    lastname={user.lastname}
                    email={user.email}
                    password={user.password}
                    money={user.money}
                    display_type={UserDisplayLabelEnums.SHORT}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      );
      break;

    case 2:
      content = (
        <Container>
          <Paper elevation={3}>
            <Box p={2}>
              <UserForm redirect={redirectHandler} />
            </Box>
          </Paper>
        </Container>
      );
      break;

    default:
      content = <div>Invalid id</div>;
  }

  return content;
};
