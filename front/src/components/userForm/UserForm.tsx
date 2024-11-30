import { ChangeEvent, useState } from "react";
import {
  Button,
  ButtonProps,
  Form,
  Header,
  InputOnChangeData,
} from "semantic-ui-react";
import { useAppDispatch } from "../../hooks";
import { submit_user_action, update_user_action } from "../../slices/userSlice";
import IUser from "../../types/IUser";

export type UserFormProps = {
  redirect: (user: IUser) => void;
  handleChange: (user: IUser) => void;
};

export const UserForm = (props: UserFormProps) => {
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState<IUser>({
    id: 0,
    surname: "",
    lastname: "",
    img: "",
    login: "",
    pwd: "",
    money: 0,
  });

  function processInput(
    event: ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
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
    _data: ButtonProps
  ) {
    // props.submitUserHandler(data);
    dispatch(submit_user_action({ user: currentUser }));
    props.redirect(currentUser);
  }

  return (
    <Form>
      <Header as="h4" dividing>
        User Registration
      </Header>
      <Form.Field>
        <Form.Input
          fluid
          type="number"
          label="Id"
          placeholder="Id"
          name="id"
          onChange={processInput}
          value={currentUser.id}
        />
      </Form.Field>
      <Form.Group widths="equal">
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

      <Form.Field>
        <Form.Input
          label="Login"
          placeholder="Login"
          onChange={processInput}
          name="login"
          value={currentUser.login}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          type="password"
          label="Pwd"
          placeholder=""
          onChange={processInput}
          name="pwd"
          value={currentUser.pwd}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          label="Image"
          placeholder="Image"
          onChange={processInput}
          name="img"
          value={currentUser.img}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          label="Money"
          type="number"
          placeholder=""
          onChange={processInput}
          name="money"
          value={currentUser.money}
        />
      </Form.Field>
      <Button type="submit" onClick={submitOrder}>
        Submit
      </Button>
    </Form>
  );
};
