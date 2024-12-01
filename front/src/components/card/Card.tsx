import { useSelector } from "react-redux";
import { selectCard } from "../../slices/cardSlice";
import { CardDisplayLabelEnums } from "../../types/CardDisplayLabelEnums";
import ICard from "../../types/ICard";
import { CardShortDisplay } from "./CardShortDisplay";
import { CardSimpleDisplay } from "./CardSimpleDisplay";

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
          image={current_card.image}
          name={current_card.name}
          family={current_card.family}
        ></CardShortDisplay>
      );

      break;
    case CardDisplayLabelEnums.FULL:
      display = ( 
        <CardSimpleDisplay
          id={0}
          name={current_card.name}
          family={current_card.family}
          description={current_card.description}
          image={current_card.image}
          hp={current_card.hp}
          energy={current_card.energy}
          attack={current_card.attack}
          defense={current_card.defense}
          price={current_card.price}
        ></CardSimpleDisplay>
      );
      break;
    default:
      display = <h4>No Display Available</h4>;
  }

  return display;
};

export default User;
