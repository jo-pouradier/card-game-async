import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ICard from "../../types/ICard";
import CardSimpleDisplay from "./CardSimpleDisplay";
import { Typography } from "@mui/material";

export interface CardListProps {
  rows: GridRowsProp<ICard> | (() => Promise<GridRowsProp<ICard>>);
  columns: GridColDef[];
}

const CardList = (props: CardListProps) => {
  const [initialRows, setInitialRows] = useState<GridRowsProp<ICard>>([]);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  // load data based on type of rows
  useEffect(() => {
    if (typeof props.rows === "function") {
      props.rows().then((data) => setInitialRows(data));
    } else {
      setInitialRows(props.rows);
    }
  }, [props]);

  const onCellClickHandler = (data: GridCellParams<ICard>) => {
    setCurrentCard(data.row);
  };

  // listend escape to set currentCard to null
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCurrentCard(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <Typography variant="body1" align="center">
        Click on a card to see more details, and type escape to close the card
      </Typography>
      <div
        style={{
          height: 700,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <DataGrid
          rows={initialRows}
          columns={props.columns}
          onCellClick={onCellClickHandler}
        />
        {currentCard && <CardSimpleDisplay {...currentCard} />}
      </div>
    </>
  );
};

export default CardList;
