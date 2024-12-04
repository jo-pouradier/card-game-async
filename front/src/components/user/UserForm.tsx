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
import { useAppDispatch } from "../../hooks";
import { update_user_action } from "../../slices/userSlice";
import IUser from "../../types/IUser";
import AppModal from "../utils/AppModal";

export interface UserFormProps {
  redirect: (user: IUser) => void;
};

interface IUserForm extends IUser {
  repassword: string;
}

export const UserForm = (props: UserFormProps) => {
  const dispatch = useAppDispatch();
  const modalContent = useRef<string>("");
  const [open, setOpen] = useState(false);
  const [passwordType1, setPasswordType1] = useState(true);
  const [passwordType2, setPasswordType2] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUserForm>({
    id: 0,
    surname: "",
    lastname: "",
    email: "",
    money: 0,
    password: "",
    repassword: "",
  });

  const processInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const data = event.currentTarget.value;
    const value = name === "money" ? parseFloat(data) : data;

    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    dispatch(update_user_action({ user: { ...currentUser, [name]: value } }));
  };

  const submitOrder = (_event: React.MouseEvent<HTMLButtonElement>) => {
    modalContent.current =
      currentUser.password !== currentUser.repassword
        ? "Password and Re-Password are not the same"
        : "User registered successfully";
    setOpen(true);
  }

  return (
    <>
      <Container>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Surname"
            placeholder="Surname"
            name="surname"
            onChange={processInput}
            value={currentUser.surname}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Last Name"
            name="lastname"
            onChange={processInput}
            value={currentUser.lastname}
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
              name="password"
              onChange={processInput}
              value={currentUser.password}
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
          content={<Typography>Form is {modalContent.current}</Typography>}
          contentProps={{}}
          actions={[
            <Button
              key="submit"
              onClick={() => {
                setOpen(false);
                props.redirect(currentUser);
              }}
            >
              Submit
            </Button>,
            <Button key="cancel" onClick={() => setOpen(false)}>
              Cancel
            </Button>,
          ]}
          open={open}
        />
      </Container>
    </>
  );
};
