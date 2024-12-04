import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import IUser from "../../types/IUser";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserSimpleDisplayProps extends Omit<IUser, "password" | "repassword"> {}

export const UserSimpleDisplay = (props: UserSimpleDisplayProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={`${props.surname} ${props.lastname}`}
        subheader={`Login: ${props.email}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          User In Database
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton disabled>
          <AttachMoney sx={{ verticalAlign: "middle", marginRight: 1 }} />
          {props.money} $
        </IconButton>
      </CardActions>
    </Card>
  );
};
