import { Container } from "@mui/material";
import CardForm, { ICardForm } from "../card/CardForm";
import CardSimpleDisplay from "../card/CardSimpleDisplay";
import ICard from "../../types/ICard";
import { useCallback, useEffect, useState } from "react";
import { addNotification } from "../../slices/notificationSlice.ts";
import { socket } from "../../socket/socket.ts";
import { useAppDispatch } from "../../hooks.ts";

const ShopCreate = () => {
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
      imgUrl: "",
      affinity: "",
      smallImgUrl: "",
      userId: 0
    });
    const [isWaitingForGeneration, setIsWaitingForGeneration] = useState(false);
    const dispatch = useAppDispatch();

  const onCardGeneratedReceived = useCallback(
    (data: object) => {
      console.info("Card generated:", data);
      // {"cardId":12,"userId":1} format it, get the card and set it
      const messageJson = JSON.parse(data.toString());
      fetch(`/api/card/${messageJson.cardId}`)
        .then((response) => response.json())
        .then((data) => {
          setGeneratedCard(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      dispatch(addNotification({
        id: Math.random() * 100,
        message: "New card added to your collection",
        severity: "info"
      }));
      setIsWaitingForGeneration(false);
    },
    [dispatch],
  );

  useEffect(() => {
    socket.on("cardGenerated", onCardGeneratedReceived);
  }, [onCardGeneratedReceived]);

    const generateCardHanlder = (card: ICardForm) => {
      console.log("generate card: ", card);

      fetch("/api/store/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
      }).then((reponse) => {
        console.log("Success:", reponse);
        setIsWaitingForGeneration(true);
      }).catch((error) => {
        console.error("Error:", error);
      });
    };


    return (
      <Container>
        <CardForm
          generateCardHanlder={generateCardHanlder}
          isWaitingForGeneration={isWaitingForGeneration}
        />
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
          imgUrl={generatedCard.imgUrl}
        />
      </Container>
    );
  }
;

export default ShopCreate;
