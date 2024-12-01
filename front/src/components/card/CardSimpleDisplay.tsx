import { Card, Icon, Image } from "semantic-ui-react";
import ICard from "../../types/ICard";

export type CardSimpleDisplayProps = ICard;

export const CardSimpleDisplay = (props: CardSimpleDisplayProps) => {
  return (
    <Card>
      <Image
        src={props.image}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>
          {props.name} {props.family}
        </Card.Header>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>
          <Icon name="heart" />
          {props.hp}
        </p>
        <p>
          <Icon name="bolt" />
          {props.energy}
        </p>
        <p>
          <Icon name="shield" />
          {props.defense}
        </p>
        <p>
          <Icon name="fire" />
          {props.attack}
        </p>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="money bill alternate outline" />
          {props.price} $
        </a>
      </Card.Content>
    </Card>
  );
};
