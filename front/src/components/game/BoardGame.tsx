import { Box, Button, Container, Divider, Drawer, Grid2 } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getCardById } from "../../api/user";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";
import { socket } from "../../socket/socket";
import ICard from "../../types/ICard";
import CardShortDisplay from "../card/CardShortDisplay";
import CardSimpleDisplay from "../card/CardSimpleDisplay";
import Chat from "../chat/Chat";
import ConnectedUserList from "../chat/ConnectedUserList";
import { sendMessage } from "../../pages/ChatPage";

export interface BoardGameProps {
  opponentId: number;
  opponentCards: number[];
}

const BoardGame = (_props: BoardGameProps) => {
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
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleCardSetCurrent = useCallback(
    (card: ICard) => {
      console.log("Card clicked", card);
      if (card.userId === user.id) {
        setUserCards((previous) =>
          [...previous, currentPlayerCard!].filter((c) => c?.id !== card.id),
        );
        setCurrentPlayerCard(() => card);
      } else {
        setOpponentCards((previous) =>
          [...previous, currentOpponentCard!]?.filter((c) => c?.id !== card.id),
        );
        setCurrentOpponentCard(() => card);
      }
    },
    [currentOpponentCard, currentPlayerCard, user.id],
  );

  const attackAction = useCallback(
    (data: {
      card1: { id: number; userId: number };
      card2: { id: number; userId: number };
    }) => {
      console.log("attack received", data);
      const [cardAttackingId, cardAttackedId] = [data.card1, data.card2];
      const allCards = [
        ...userCards,
        ...opponentCards,
        currentPlayerCard,
        currentOpponentCard,
      ].filter((c) => c !== null);

      const cardAttacking =
        allCards.find((c) => c.id === cardAttackingId.id) ?? null;
      const cardAttacked =
        allCards.find((c) => c.id === cardAttackedId.id) ?? null;

      if (cardAttacking === null || cardAttacked === null) {
        console.log(
          "Error with attacking cards: ",
          cardAttackingId,
          ": ",
          cardAttacked,
          ", ",
          cardAttackedId,
          ": ",
          cardAttacked,
        );
        return;
      }
      // set function based on userId
      const setAttackingCard =
        cardAttacking.userId === user.id
          ? setCurrentPlayerCard
          : setCurrentOpponentCard;
      const setAttackedCard =
        cardAttacked.userId === user.id
          ? setCurrentPlayerCard
          : setCurrentOpponentCard;

      console.log(
        "Attacking with current setup: cardAttacking=",
        cardAttacking,
        ", cardAttacked=",
        cardAttacked,
      );

      handleCardSetCurrent(cardAttacking);
      handleCardSetCurrent(cardAttacked);

      setAttackedCard((previous) => {
        if (previous === null) {
          previous = cardAttacked;
        }
        previous.hp -= cardAttacking.attack;
        return previous;
      });
      setAttackingCard(() => cardAttacking);

      setIsAttackLoading(() => false);
    },
    [
      user.id,
      currentOpponentCard,
      currentPlayerCard,
      opponentCards,
      userCards,
      handleCardSetCurrent,
    ],
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

    return () => {
      socket.off("decks");
      socket.off("readyToPlay");
    };
  }, [user.id]);

  useEffect(() => {
    socket.on("attack", attackAction);
    return () => {
      socket.off("attack", attackAction);
    };
  }, [attackAction]);

  const sendAttack = () => {
    setIsAttackLoading(() => true);

    if (currentPlayerCard !== null && currentOpponentCard !== null) {
      console.log("Attack", currentPlayerCard, currentOpponentCard);
      socket.emit("attack", {
        card1: { id: currentPlayerCard.id, userId: currentPlayerCard.userId }, //attacking
        card2: {
          id: currentOpponentCard.id,
          userId: currentOpponentCard.userId,
        }, //attacked
      });
    }
  };

  return (
    <>
      <Drawer anchor="left" open={isChatOpen} onClose={toggleChat}>
        <Box sx={{ width: 300, p: 2 }}>
          <ConnectedUserList />
      <Chat sendMessage={sendMessage} />
        </Box>
      </Drawer>
      <Button
        variant="contained"
        onClick={toggleChat}
      >
        Toggle Chat
      </Button>
      <Container>
        {isOpponentCardLoading ? (
          <p>Loading opponent cards...</p>
        ) : (
          createCardList(
            opponentCards,
            currentOpponentCard,
            handleCardSetCurrent,
          )
        )}
        <Divider textAlign="center">
          {" "}
          <Button
            variant={isAttackLoading ? "outlined" : "contained"}
            onClick={() => sendAttack()}
          >
            {isAttackLoading ? "Loading" : "Attack"}
          </Button>{" "}
        </Divider>
        {isUserCardLoading ? (
          <p>Loading User cards ...</p>
        ) : (
          createCardList(userCards, currentPlayerCard, handleCardSetCurrent)
        )}
      </Container>
    </>
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
