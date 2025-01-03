import { Box, Container, Grid2 as Grid, Paper } from "@mui/material";
import User from "../components/user/User";
import UserForm from "../components/user/UserForm";
import { UserDisplayLabelEnums } from "../types/UserDisplayLabelEnums";

export interface FormDisplayProps {
  id?: number;
}

const FormDisplay = (props: FormDisplayProps) => {
  const id = props.id ?? -1;

  let content;
  switch (id) {
    case -1:
      content = (
        <Container>
          <Grid container spacing={3}>
            <Grid size={4}>
              <Paper elevation={3}>
                <Box p={2}>
                  <UserForm />
                </Box>
              </Paper>
            </Grid>
            <Grid size={4}>
              <User display_type={UserDisplayLabelEnums.FULL} />
            </Grid>
            <Grid size={4}>
              <User display_type={UserDisplayLabelEnums.SHORT} />
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
              <UserForm />
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

export default FormDisplay;
