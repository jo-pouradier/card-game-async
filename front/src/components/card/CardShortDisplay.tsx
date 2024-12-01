import { Feed } from "semantic-ui-react";

export type CardShortDisplayProps = {
  image: string;
  name: string;
  family: string;
};

export const CardShortDisplay = (props: CardShortDisplayProps) => {
  return (
    <Feed>
      <Feed.Event>
        <Feed.Label>
          <img src={props.image} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <a>
              {props.name} {props.family}
            </a>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
};
