import { Button, Container, Divider, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { getCardById } from "../../api/user";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";
import ICard from "../../types/ICard";
import CardSimpleDisplay from "../card/CardSimpleDisplay";
import CardShortDisplay from "../card/CardShortDisplay";
import { addNotification } from "../../slices/notificationSlice";
import { socket } from "../../socket/socket";

export interface BoardGameProps {
  opponentId: number;
  opponentCards: number[];
}

const BoardGame = (_props: BoardGameProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isAttackLoading, setIsAttackLoading] = useState(false);
  const [isOpponentCardLoading, setIsOpponentCardLoading] = useState(false);
  const [isUserCardLoading, setIsUserCardLoading] = useState(false);
  const [userCards, setUserCards] = useState<ICard[]>([]);
  const [opponentCards, setOpponentCards] = useState<ICard[]>([]);
  const [currentOpponentCard, setCurrentOpponentCard] = useState<ICard | null>(
    null,
  );
  const [currentPlayerCard, setCurrentPlayerCard] = useState<ICard | null>(
    null,
  );

  useEffect(() => {
    socket.on("decks", (decks: { deck1: number[]; deck2: number[] }) => {
      console.log("Decks received", decks);
      setIsOpponentCardLoading(() => true);
      setIsUserCardLoading(() => true);
      fetchMultipleCards(decks.deck1)
        .then((data) => {
          console.log("Fetched cards for current player", data);
          setUserCards((previous: ICard[]) => [...previous, ...data]);
        })
        .finally(() => setIsUserCardLoading(() => false));
      fetchMultipleCards(decks.deck2)
        .then((data) => {
          console.log("Fetched cards for opponent", data);
          setOpponentCards((previous: ICard[]) => [...previous, ...data]);
        })
        .finally(() => setIsOpponentCardLoading(() => false));
    });

    socket.emit("readyToPlay", user.id);
  }, [user.id]);

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
    setIsAttackLoading(() => true);
    console.log("Attack", currentPlayerCard, currentOpponentCard);
    // TODO: implement socket communication
    setTimeout(() => {
      setIsAttackLoading(() => false);
      dispatch(
        addNotification({
          id: Math.round(Math.random() * 10000),
          message: "Attack successful",
        }),
      );
    }, 2000);
  };

  return (
    <Container>
      {
      isOpponentCardLoading ? <p>Loading opponent cards...</p> : createCardList(opponentCards, currentOpponentCard, handleCardClick)
      }
      <Divider textAlign="center">
        {" "}
        <Button
          variant={isAttackLoading ? "outlined" : "contained"}
          onClick={() => attack()}
        >
          {isAttackLoading ? "Loading" : "Attack"}
        </Button>{" "}
      </Divider>
      {isUserCardLoading ? <p>Loading User cards ...</p> : createCardList(userCards, currentPlayerCard, handleCardClick)}
    </Container>
  );
};

export default BoardGame;

const fetchMultipleCards = async (ids: number[]): Promise<ICard[]> => {
  const promises = ids.map((id) => getCardById(id));
  const cards = await Promise.all(promises);
  return cards;
};

const createCardList = (
  cards: ICard[],
  currentCard: ICard | null,
  handleCardClick: (card: ICard) => void,
): JSX.Element => {
  return (
    <Grid2 container spacing={0.3} direction={"row"} justifyContent={"center"}>
      {cards.map((card, index) => {
        if (card !== null) {
          return (
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
          );
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
