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
export interface CardSimpleDisplayProps extends Partial<ICard> {}

const CardSimpleDisplay = (props: CardSimpleDisplayProps) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {props?.imgUrl && (
        <CardMedia
          component="img"
          height="200"
          image={props.imgUrl}
          alt={props.name}
        />
      )}
      <CardContent sx={{paddingTop: 0, paddingBottom: 0, marginBottom: 0}}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{margin: 0}}>
          {props?.name} {props?.family}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {props?.description}
        </Typography>
      </CardContent>
      <CardContent sx={{paddingTop: 0, paddingBottom: 0}}>
        <Stack direction="row" spacing={2} alignItems="center">
          <FavoriteIcon color="error" />
          <Typography variant="body1">{props?.hp?.toPrecision(3)}</Typography>
          <BoltIcon color="warning" />
          <Typography variant="body1">{props?.energy?.toFixed(3)}</Typography>
          <ShieldIcon color="primary" />
          <Typography variant="body1">{props?.defense?.toFixed(3)}</Typography>
          {/* <Flare color="warning" /> */}
          <AttackIcon />
          <Typography variant="body1">{props?.attack?.toFixed(3)}</Typography>
        </Stack>
      </CardContent>
      <CardContent sx={{paddingTop: 0, paddingBottom: 0}}>
        <Box display="flex" alignItems="center" gap={1} sx={{paddingTop: 0, paddingBottom: 0}}>
          <AttachMoneyIcon color="success" />
          <Typography variant="body1" sx={{paddingBottom: 0}}>{props?.price} $</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardSimpleDisplay;
