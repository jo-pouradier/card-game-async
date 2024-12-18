import { Button, Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCards } from "../../api/user";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addNotification } from "../../slices/notificationSlice";
import { selectUser } from "../../slices/userSlice";
import ICard from "../../types/ICard";
import CardSelect from "../card/CardSelectPlay";
import CardShortDisplay from "../card/CardShortDisplay";
import {socket} from "../../socket/socket.ts";
import {useNavigate} from "react-router-dom";

export interface CardSelection extends ICard {
  isSelected: boolean;
}

const CardSelection = () => {
  const [selectedCard, setSelectedCard] = useState<number[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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

  const searchGame = () => {
    console.log('Search Game');
    dispatch(addNotification({id: 0, message: 'Searching for game', severity: 'info'}));
    socket.emit('findMatch', selectedCard, user.id);
    navigate('/game/waiting');
  }


  socket.on('gameFound', (card1:number, card2:number, card3:number, card4:number, card5:number, card6:number, card7:number, card8:number, card9:number, card10:number) => {
    navigate(`/game/playing?card1=${card1}&card2=${card2}&card3=${card3}&card4=${card4}&card5=${card5}&card6=${card6}&card7=${card7}&card8=${card8}&card9=${card9}&card10=${card10}`);
  });


  return (
    <>
      <Container style={{ height: "50vh", overflowY: "scroll" }}>
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
      <Container style={{ marginTop: "2rem" }}>
        <div style={{display: 'flex'}}>
          <Typography variant="h4" style={{marginRight: '1rem'}}>
            Selected Cards ({selectedCard.length}/5)
          </Typography>
          {selectedCard.length === 5 && (
            <Button variant="contained" color="primary" onClick={() => searchGame()}>
              Play
            </Button>
          )}
        </div>
        <Grid2 container spacing={1} direction={"row"}>
          {cards
            .filter((card) => selectedCard.includes(card.id))
            .map((card, index) => (
              <Grid2 size={2.3} key={index}>
                <CardShortDisplay {...card} />
              </Grid2>
            ))}
        </Grid2>
      </Container>
    </>
  );
};

export default CardSelection;
