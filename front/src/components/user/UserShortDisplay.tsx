import { AccountCircle, AttachMoney } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export interface UserShortDisplayProps {
  surname?: string;
  lastname?: string;
  money?: number;
};

const UserShortDisplay = (props: UserShortDisplayProps) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardHeader
        avatar={
          <AccountCircle
            sx={{ color: "primary.main", width: 56, height: 56 }}
          />
        }
        title={`${props.surname ?? ""} ${props.lastname ?? ""}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <AttachMoney sx={{ verticalAlign: "middle", marginRight: 1 }} />
          {props.money}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserShortDisplay;
