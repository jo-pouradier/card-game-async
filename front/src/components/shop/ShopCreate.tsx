import { Container } from "semantic-ui-react";
import { CardForm, ICardForm } from "../card/CardForm";
import { CardSimpleDisplay } from "../card/CardSimpleDisplay";
import ICard from "../../types/ICard";
import { useState } from "react";

export const ShopCreate = () => {
  const [generatedCard, setGeneratedCard] = useState<ICard>({
    id: 0,
    name: "",
    family: "",
    description: "",
    hp: 0,
    energy: 0,
    defense: 0,
    attack: 0,
    price: 0,
    image: "",
  });

  const submitCardHandler = (card: ICardForm) => {
    console.log("submit card: ", card);
  }
  const generateCardHanlder = (card: ICardForm) => {
    console.log("generate card: ", card);
    // fetch to created card from api
    setGeneratedCard({
      id: 1,
      name: "My Card",
      family: "My Family",
      description: "My Description",
      hp: 100,
      energy: 100,
      defense: 100,
      attack: 100,
      price: 100,
      image: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    });
  };

  return (
    <Container>
      <CardForm submitCardHandler={submitCardHandler} generateCardHanlder={generateCardHanlder}/>
      <CardSimpleDisplay
        id={generatedCard.id}
        name={generatedCard.name}
        family={generatedCard.family}
        description={generatedCard.description}
        hp={generatedCard.hp}
        energy={generatedCard.energy}
        defense={generatedCard.defense}
        attack={generatedCard.attack}
        price={generatedCard.price}
        image={generatedCard.image}
      />
    </Container>
  );
};
