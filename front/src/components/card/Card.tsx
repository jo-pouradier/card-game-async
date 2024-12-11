import { useSelector } from "react-redux";
import { selectCard } from "../../slices/cardSlice";
import { CardDisplayLabelEnums } from "../../types/CardDisplayLabelEnums";
import ICard from "../../types/ICard";
import CardShortDisplay from "./CardShortDisplay";
import CardSimpleDisplay from "./CardSimpleDisplay";

export interface CardProps extends ICard {
  display_type: CardDisplayLabelEnums;
}

const User = (props: CardProps) => {
  const current_card: ICard = useSelector(selectCard);
  let display: JSX.Element = <></>;
  switch (props.display_type) {
    case CardDisplayLabelEnums.SHORT:
      display = (
        <CardShortDisplay
          {...current_card}
        ></CardShortDisplay>
      );

      break;
    case CardDisplayLabelEnums.FULL:
      display = (
        <CardSimpleDisplay
          {...current_card}
        ></CardSimpleDisplay>
      );
      break;
    default:
      display = <h4>No Display Available</h4>;
  }

  return display;
};

export default User;
