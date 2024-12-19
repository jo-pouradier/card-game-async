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

    socket.on("attack", (data: {card1: {id:number, userId:number }, card2: {id:number, userId:number}}) => {
        console.log("attack received", data);
        const {card1, card2} = data;

        if (card2.id && card2.userId && card1.id) {
            if (card2.userId === user.id) {
                for (let i = 0; i < userCards.length; i++) {
                    if (userCards[i].id === card2.id && opponentCards.find(c => c.id === card1.id) !== undefined) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        if (userCards[i].hp > opponentCards.find(c => c.id === card1.id)?.attack) {
                            userCards[i].hp -= opponentCards.find(c => c.id === card1.id)?.attack ?? 0;
                            setUserCards([...userCards]);
                        } else {
                            setUserCards(userCards.filter(c => c.id !== card2.id));
                        }
                    }
                }
            }
        }
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

    if (currentPlayerCard !== null && currentOpponentCard !== null) {
      console.log("Attack", currentPlayerCard, currentOpponentCard);
      socket.emit("attack", {
        card1: {id:currentPlayerCard.id, userId: currentPlayerCard.userId},
        card2: {id:currentOpponentCard.id, userId: currentOpponentCard.userId},
      });
      setTimeout(() => {
        setIsAttackLoading(() => false);
        dispatch(
            addNotification({
              id: Math.round(Math.random() * 10000),
              message: "Attack successful",
            }),
        );
      }, 2000);

      if(currentOpponentCard.hp <= currentPlayerCard.attack) {
        setOpponentCards(opponentCards.filter(c => c.id !== currentOpponentCard.id));
    } else {
        setOpponentCards(opponentCards.map(c => {
            if(c.id === currentOpponentCard.id) {
                c.hp -= currentPlayerCard.attack;
            }
            return c;
        }));
    }
  }
}

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
  return await Promise.all(promises);
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

