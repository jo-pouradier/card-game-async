import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { postNewUser } from "../../api/user";
import { useAppDispatch } from "../../hooks";
import {
  connect_user_action,
  selectModifiedUser,
  update_user_action,
} from "../../slices/userSlice";
import IUser from "../../types/IUser";
import AppModal from "../utils/AppModal";
import { useNavigate } from "react-router";

interface IUserForm extends IUser {
  repassword: string;
}

const UserForm = (_props: unknown) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const modified_user = useSelector(selectModifiedUser);
  const modalContent = useRef<string>("");
  const [open, setOpen] = useState(false);
  const userCreated = useRef<boolean>(false);
  const [passwordType1, setPasswordType1] = useState(true);
  const [passwordType2, setPasswordType2] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUserForm>({
    ...modified_user,
    repassword: "",
  });

  const processInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.name, event.currentTarget.value);
    const name = event.currentTarget.name;
    const data = event.currentTarget.value;
    const value = name === "money" ? parseFloat(data) : data;

    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    dispatch(update_user_action({ user: { ...currentUser, [name]: value } }));
  };

  const submitOrder = async (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentUser.pwd !== currentUser.repassword) {
      modalContent.current = "Password and Re-Password are not the same";
      setOpen(true);
      return;
    }
    try {
      const user = await postNewUser(currentUser);
      dispatch(connect_user_action({ user }));
      modalContent.current = "User has been created";
      userCreated.current = true;
      setOpen(true);
    } catch (error) {
      console.log(error);
      modalContent.current = "User could already exist";
      userCreated.current = false;
      setOpen(true);
    }
  };

  const closeModal = () => {
    setOpen(false);
    if (userCreated.current) {
      navigate("/");
    }
  };

  return (
    <Container>
      <form noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Surname"
          placeholder="Surname"
          name="surName"
          onChange={processInput}
          value={currentUser.surName}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          onChange={processInput}
          value={currentUser.lastName}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Login"
          placeholder="Login"
          name="login"
          onChange={processInput}
          value={currentUser.login}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          placeholder="email"
          onChange={processInput}
          name="email"
          value={currentUser.email}
          autoComplete="email"
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Password</InputLabel>
          <Input
            type={passwordType1 ? "password" : "text"}
            name="pwd"
            onChange={processInput}
            value={currentUser.pwd}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setPasswordType1(!passwordType1)}>
                  {passwordType1 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Re-Password</InputLabel>
          <Input
            type={passwordType2 ? "password" : "text"}
            name="repassword"
            onChange={processInput}
            value={currentUser.repassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setPasswordType2(!passwordType2)}>
                  {passwordType2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={submitOrder}>
          Submit
        </Button>
      </form>
      <AppModal
        triggerElement={<div></div>}
        title="User Registration"
        content={<Typography>{modalContent.current}</Typography>}
        contentProps={{}}
        actions={[
          <Button key="cancel" onClick={closeModal}>
            Close
          </Button>,
        ]}
        open={open}
      />
    </Container>
  );
};

export default UserForm;
