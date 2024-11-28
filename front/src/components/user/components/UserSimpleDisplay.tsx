import { Card, Image, Icon } from "semantic-ui-react";
import IUser from "../../../types/IUser";

export type UserSimpleDisplayProps = IUser;

export const UserSimpleDisplay = (props: UserSimpleDisplayProps) => {
  return (
    <Card>
      <Image
        src="https://www.nicepng.com/png/full/982-9820051_heart-2352306885-deadpool-png.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>
          {props.surname} {props.lastname}{" "}
        </Card.Header>
        <Card.Meta>
          <span className="date">login: {props.login}</span>
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
