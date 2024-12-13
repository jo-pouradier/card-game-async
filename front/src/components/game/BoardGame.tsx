import { Button, Container, Divider, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { getCardById } from "../../api/user";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";
import ICard from "../../types/ICard";
import CardSimpleDisplay from "../card/CardSimpleDisplay";
import CardShortDisplay from "../card/CardShortDisplay";
import { addNotification } from "../../slices/notificationSlice";

export interface BoardGameProps {
  opponentId: number;
  opponentCards: number[];
}

const BoardGame = (props: BoardGameProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [userCards, setUserCards] = useState<ICard[]>([]);
  const [opponentCards, setOpponentCards] = useState<ICard[]>([]);
  const [currentOpponentCard, setCurrentOpponentCard] = useState<ICard | null>(
    null,
  );
  const [currentPlayerCard, setCurrentPlayerCard] = useState<ICard | null>(
    null,
  );

  const handleCardClick = (card: ICard) => {
    console.log("Card clicked", card);
    if (card.userId === user.id) {
      setUserCards((previous) =>
        [...previous, currentPlayerCard!].filter((c) => c?.id !== card.id),
      );
      setCurrentPlayerCard(card);
    } else {
      setOpponentCards((previous) =>
        [...previous, currentOpponentCard!]?.filter((c) => c?.id !== card.id),
      );
      setCurrentOpponentCard(card);
    }
  };

  const attack = () => {
    setIsLoading(() => true);
    console.log("Attack", currentPlayerCard, currentOpponentCard);
    // TODO: implement socket communication
    setTimeout(() => {
      setIsLoading(() => false);
      dispatch(addNotification({ id: Math.round(Math.random() *10000), message: "Attack successful" }));
    }, 2000);
  }

  useEffect(() => {
    fetchMultipleCards(user.cardList).then((data) => {
      console.log("Fetched cards", data);
      setUserCards((previous: ICard[]) => [...previous, ...data]);
    }); // Fetch user cards
    fetchMultipleCards(user.cardList).then((data) =>
      setOpponentCards((previous: ICard[]) => [...previous, ...data]),
    ); // TODO: Fetch opponent cards from props
  }, [user]);

  return (
    <Container>
      {createCardList(userCards, currentPlayerCard, handleCardClick)}
      <Divider textAlign="center"> <Button variant={isLoading ? "outlined" : "contained"} onClick={() => attack()}>{isLoading ? "Loading" : "Attack"}</Button> </Divider>
      {createCardList(opponentCards, currentOpponentCard, handleCardClick)}
    </Container>
  );
};

export default BoardGame;

const fetchMultipleCards = async (ids: number[]): Promise<ICard[]> => {
  const promises = ids.map((id) => getCardById(id));
  const cards = await Promise.all(promises);
  console.log("Fetched cards", cards);
  return cards;
};

const createCardList = (
  cards: ICard[],
  currentCard: ICard | null,
  handleCardClick: (card: ICard) => void,
): JSX.Element => {
  return (
    <Grid2 container spacing={0.3} direction={"row"} justifyContent={"center"}>
      {cards.map(
        (card, index) => {
            if (card !== null) {
                return ((
                    <Grid2 size={1.7} key={index}>
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer",
                        }}
                        onClick={() => handleCardClick(card)}
                    >
                        <CardShortDisplay {...card} />
                    </div>
                    </Grid2>
                ))
            }
        })}
      {currentCard !== null && (
        <Grid2 size={3}>
          <CardSimpleDisplay {...currentCard} />
        </Grid2>
      )}
    </Grid2>
        
  );
};
