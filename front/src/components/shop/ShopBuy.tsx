import { Typography } from "@mui/material";
import CardList from "../card/CardGrid";
import ICard from "../../types/ICard";

const ShopBuy = () => {
  const fetchRows = async () => {
    const response: Response = await fetch("/api/cards");
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
    { field: "defense", headerName: "Defense", width: 150 },
    { field: "energy", headerName: "Energy", width: 150 },
  ];
  
  return (
    <>
      <Typography variant="h3" align="center">
        shop buy
      </Typography>
      <CardList rows={fetchRows} columns={cols} />
    </>
  );
};

export default ShopBuy;
