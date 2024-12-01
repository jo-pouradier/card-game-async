import { Feed, Icon } from "semantic-ui-react";

export type UserShortDisplayProps = {
  surname: string;
  lastname: string;
  money: number;
};

export const UserShortDisplay = (props: UserShortDisplayProps) => {
  return (
    <Feed>
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <a>
              {props.surname} {props.lastname}
            </a>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name="money bill alternate outline" />
              {props.money}
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
};
