import { Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCards } from "../../api/user";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";
import ICard from "../../types/ICard";
import CardSelect from "../card/CardSelectPlay";
import CardShortDisplay from "../card/CardShortDisplay";

export interface CardSelection extends ICard {
  isSelected: boolean;
}

const CardSelection = () => {
  const [selectedCard, setSelectedCard] = useState<number[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const user = useAppSelector(selectUser);

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
    <>
    <Container style={{ height: "50vh", overflowY: "scroll"}}>
      <Grid2 container spacing={1} direction={"row"}>
        {cards
          .filter((card) => card.id !== user.id)
          .map(
            (
              card,
              index, // TODO change for ===
            ) => (
              <Grid2 size={3} key={index}>
                <CardSelect
                  {...card}
                  isSelected={selectedCard.includes(card.id)}
                  onSelection={handleCardSelection}
                />
              </Grid2>
            ),
          )}
      </Grid2>
    </Container>
    <Container style={{marginTop: "2rem"}}>
      <Typography variant="h4">Selected Cards ({selectedCard.length}/5)</Typography>
      <Grid2 container spacing={1} direction={"row"}>
        {cards
          .filter((card) => selectedCard.includes(card.id))
          .map(
            (
              card,
              index,
            ) => (
              <Grid2 size={3} key={index}>
                <CardShortDisplay {...card} />
              </Grid2>
            ),
          )}
      </Grid2>
    </Container>
    </>
  );
};

export default CardSelection;
