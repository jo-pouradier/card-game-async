import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ICard from "../../types/ICard";

export interface CardListProps {
  rows: GridRowsProp<ICard> | (() => Promise<GridRowsProp<ICard>>);
  columns: GridColDef[];
  onRowClickHandler?: (card: ICard | null) => void;
}

const CardList = (props: CardListProps) => {
  const [initialRows, setInitialRows] = useState<GridRowsProp<ICard>>([]);
  const setCurrentCard =
    props.onRowClickHandler ?? ((_card: ICard | null) => {});
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

  return (
    <DataGrid
      rows={initialRows}
      columns={props.columns}
      onCellClick={onCellClickHandler}
      sx={{ height: 650, width: "100%" }}
    />
  );
};

export default CardList;
