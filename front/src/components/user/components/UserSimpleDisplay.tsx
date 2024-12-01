import { Card, Icon } from "semantic-ui-react";
import IUser from "../../../types/IUser";

export type UserSimpleDisplayProps = Omit<IUser, "password" | "repassword">;

export const UserSimpleDisplay = (props: UserSimpleDisplayProps) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {props.surname} {props.lastname}{" "}
        </Card.Header>
        <Card.Meta>
          <span className="date">login: {props.email}</span>
        </Card.Meta>
        <Card.Description>User In DataBase</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="money bill alternate outline" />
          {props.money} $
        </a>
      </Card.Content>
    </Card>
  );
};
