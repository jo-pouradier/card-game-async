import { useEffect, useState } from "react";
import { getCards } from "../../api/user";
import ICard from "../../types/ICard";
import CardSelect from "../card/CardSelectPlay";
import { Grid2 } from "@mui/material";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";

export interface CardSelection extends ICard {
  isSelected: boolean;
}

const CardSelection = () => {
  const [selectedCard, setSelectedCard] = useState<number[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const user = useAppSelector(selectUser)

  useEffect(() => {
    let active = true;
    const fetchCards = async () => {
      const data = await getCards();
      if (active) {
        setCards(data);
      }
    };
    fetchCards();
    return () => {
      active = false;
    };
  }, []);

  const handleCardSelection = (selected: boolean, cardId: number) => {
    if (selected) {
      setSelectedCard((previous) => [...previous, cardId]);
      return;
    } else {
      setSelectedCard((previous) => previous.filter((id) => id !== cardId));
    }
  };

  return (
      <Grid2 container spacing={2} direction={"row"}>
      {cards.filter(card => card.id !== user.id).map((card, index) => ( // TODO change for ===
        <Grid2 size={3} key={index}>
        <CardSelect
          {...card}
          isSelected={selectedCard.includes(card.id)}
          onSelection={handleCardSelection}
        />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default CardSelection;
