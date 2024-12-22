import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltIcon from "@mui/icons-material/Bolt";
import ICard from "../../types/ICard";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardShortDisplayProps
  extends Omit<ICard, "imgUrl" | "affinity" | "userId"> {}

const CardShortDisplay = (props: CardShortDisplayProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        padding: 2,
        borderRadius: 0.5,
        boxShadow: 2,
        backgroundColor: "background.paper",
      }}
    >
      {/* <Avatar
        src={props.smallImgUrl}
        alt={props.name}
        sx={{ width: 56, height: 56 }}
      /> */}
      <Box>
        <Typography variant="body1" fontWeight="bold">
          {props.name} {props.family}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {props.hp.toFixed(3)}
          <FavoriteIcon color="error" />, {props.energy.toFixed(3)}{" "}
          <BoltIcon color="warning" />
        </Typography>
        <Box
          component={"img"}
          src={props.smallImgUrl}
          alt={props.name}
          sx={{ width: 100, height: 70 }}
        />
      </Box>
    </Box>
  );
};

export default CardShortDisplay;
