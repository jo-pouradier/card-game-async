import { Button, Container, Grid2, Typography } from "@mui/material";
import CardList from "../card/CardGrid";
import ICard from "../../types/ICard";
import { useEffect, useState } from "react";
import CardSimpleDisplay from "../card/CardSimpleDisplay";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";
import { sellCard } from "../../api/user";
import { addNotification } from "../../slices/notificationSlice";

const ShopSell = () => {
  const dispatch = useAppDispatch();
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [size, setSize] = useState(12);
  const user = useAppSelector(selectUser);
  const fetchRows = async () => {
    const response = await fetch("/api/cards");
    const data: ICard[] = await response.json();
    const finalData = data.filter((card) => card.userId === user?.id);
    console.log("finalData", finalData);
    return finalData;
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

  const sellCardHandler = async () => {
    console.log(`Selliong card: ${currentCard?.name}`);
    if (!user || !currentCard) {
      return;
    }
    const result = await sellCard(user.id, currentCard.id);
    if (!result) {
      dispatch(
        addNotification({
          id: 0,
          message: "Failed to sell card",
          severity: "error",
        }),
      );
      console.error("Failed to sell card");
      return;
    }
    console.info("sellCard result", result);
    setCurrentCard(null);
    setSize(12);
    dispatch(
      addNotification({ id: 0, message: "Card sold", severity: "success" }),
    );
  };

  return (
    <>
      <Container>
        <Typography variant="h3" align="center">
          Sell buy
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
                  onClick={() => sellCardHandler()}
                  style={{ marginTop: "1rem" }}
                >
                  Sell
                </Button>
              </Grid2>
            </Grid2>
          )}
        </Grid2>
      </Container>
    </>
  );
};

export default ShopSell;
