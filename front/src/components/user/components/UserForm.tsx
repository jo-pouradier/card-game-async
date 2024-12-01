import { ChangeEvent, useRef, useState } from "react";
import {
  Button,
  ButtonProps,
  Container,
  Form,
  Header,
  Icon,
  InputOnChangeData,
} from "semantic-ui-react";
import IUser from "../../../types/IUser";
import AppModal from "../../utils/AppModal";
import { useAppDispatch } from "../../../hooks";
import { update_user_action } from "../../../slices/userSlice";

export type UserFormProps = {
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

  function processInput(
    event: ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) {
    const name = event.currentTarget.name;
    const value = name === "money" ? parseFloat(data.value) : data.value;

    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    dispatch(update_user_action({ user: { ...currentUser, [name]: value } }));
  }

  function submitOrder(
    _event: React.MouseEvent<HTMLButtonElement>,
    _data: ButtonProps,
  ) {
    // props.submitUserHandler(data);
    // verify password == re-password
    modalContent.current =
      currentUser.password !== currentUser.repassword
        ? "Password and Re-Password are not the same"
        : "User registered successfully";
    setOpen(true);
    // dispatch(submit_user_action({ user: currentUser }));
    // props.redirect(currentUser);
  }

  return (
    <>
      <Container>
        <Form>
          <Header as="h4" dividing>
            User Registration
          </Header>
          <Form.Group grouped={true} widths="equal">
            <Form.Input
              fluid
              label="Surname"
              placeholder="Surname"
              name="surname"
              onChange={processInput}
              value={currentUser.surname}
            />
            <Form.Input
              fluid
              label="Last Name"
              placeholder="Last Name"
              name="lastname"
              onChange={processInput}
              value={currentUser.lastname}
            />
          </Form.Group>

          <Form.Input
            fluid
            label="Email"
            placeholder="email"
            onChange={processInput}
            autoComplete="email"
            name="email"
            value={currentUser.email}
          />
          <Form.Input
            type={passwordType1 ? "password" : "text"}
            label="Password"
            placeholder=""
            onChange={processInput}
            name="password"
            autoComplete="new-password"
            value={currentUser.password}
            icon={
              <Icon
                name="eye"
                circular
                link
                onClick={() => setPasswordType1(!passwordType1)}
              />
            }
          />
          <Form.Input
            type={passwordType2 ? "password" : "text"}
            label="Re-Password"
            placeholder=""
            onChange={processInput}
            name="repassword"
            autoComplete="new-password"
            value={currentUser.repassword}
            icon={
              <Icon
                name="eye"
                circular
                link
                onClick={() => setPasswordType2(!passwordType2)}
              />
            }
          />
          <Button type="submit" onClick={submitOrder}>
            Submit
          </Button>
        </Form>
        <AppModal
          triggerElement={<div></div>}
          title="User Registration"
          content={<div>Form is {modalContent.current}</div>}
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
