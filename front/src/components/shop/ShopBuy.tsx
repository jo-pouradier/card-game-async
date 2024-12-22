import { Button, Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { buyCard } from "../../api/user";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addNotification } from "../../slices/notificationSlice";
import { selectUser } from "../../slices/userSlice";
import ICard from "../../types/ICard";
import CardList from "../card/CardGrid";
import CardSimpleDisplay from "../card/CardSimpleDisplay";

const ShopBuy = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [size, setSize] = useState(12);
  const fetchRows = async () => {
    const response: Response = await fetch("/api/store/cards_to_sell");
    const data: ICard[] = await response.json();
    return data;
  };

  const cols = [
    { field: "id", headerName: "ID", width: 15 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "attack", headerName: "Attack", width: 150 },
    { field: "hp", headerName: "HP", width: 150 },
    { field: "defence", headerName: "Defence", width: 150 },
    { field: "energy", headerName: "Energy", width: 150 },
  ];

  // listend escape to set currentCard to null
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCurrentCard(null);
        setSize(12);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [setCurrentCard]);

  const onRowClickHandler = (card: ICard | null) => {
    setCurrentCard(card);
    setSize(8);
  };

  const buyCardHandler = async () => {
    console.log(`Buying card: ${currentCard?.name}`);
    if (!user || !currentCard) {
      return;
    }
    const result = await buyCard(user.id, currentCard.id);
    if (!result) {
      console.log("Failed to buy card");
      dispatch(
        addNotification({
          id: 3,
          message: "Failed to buy card",
          severity: "error",
        }),
      );
      return;
    }
    setCurrentCard(null);
    setSize(12);
    console.info("Card bought successfully");
    dispatch(
      addNotification({
        id: 3,
        message: "Card bought successfully",
        severity: "success",
      }),
    );
  };

  return (
    <>
      <Container>
        <Typography variant="h3" align="center">
          shop buy
        </Typography>
        <Typography variant="h6" align="center">
          Click on a card to see more details, press escape to close the card
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={size}>
            <CardList
              rows={fetchRows}
              columns={cols}
              onRowClickHandler={onRowClickHandler}
            />
          </Grid2>
          {currentCard && (
            <Grid2 size={12 - size}>
              <Grid2 size={12}>
                <CardSimpleDisplay {...currentCard} />
              </Grid2>
              <Grid2
                display="flex"
                size="grow"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  variant="outlined"
                  onClick={() => buyCardHandler()}
                  style={{ marginTop: "1rem" }}
                >
                  Buy
                </Button>
              </Grid2>
            </Grid2>
          )}
        </Grid2>
      </Container>
    </>
  );
};

export default ShopBuy;
