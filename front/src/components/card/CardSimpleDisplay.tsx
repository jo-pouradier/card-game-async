// import { Flare } from "@mui/icons-material";
import AttackIcon from "../../assets/AttackIcon";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BoltIcon from "@mui/icons-material/Bolt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShieldIcon from "@mui/icons-material/Shield";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import ICard from "../../types/ICard";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardSimpleDisplayProps extends Partial<ICard> {};

export const CardSimpleDisplay = (props: CardSimpleDisplayProps) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {props?.image && (
        <CardMedia
          component="img"
          height="200"
          image={props.image}
          alt={props.name}
        />
      )}
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {props?.name} {props?.family}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {props?.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <FavoriteIcon color="error" />
          <Typography variant="body1">{props?.hp}</Typography>
          <BoltIcon color="warning" />
          <Typography variant="body1">{props?.energy}</Typography>
          <ShieldIcon color="primary" />
          <Typography variant="body1">{props?.defense}</Typography>
          {/* <Flare color="warning" /> */}
          <AttackIcon />
          <Typography variant="body1">{props?.attack}</Typography>
        </Stack>
      </CardContent>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <AttachMoneyIcon color="success" />
          <Typography variant="body1">{props?.price} $</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
