import { AccountCircle } from "@mui/icons-material";
import { capitalize, Card, CardHeader } from "@mui/material";

export interface UserShortDisplayProps {
  surname?: string;
  lastname?: string;
  money?: number;
}

const UserShortDisplay = (props: UserShortDisplayProps) => {
  return (
    <Card sx={{ minWidth: 80, maxWidth: 200, padding: 0 }}>
      <CardHeader
        avatar={
          <AccountCircle
            sx={{ color: "primary.main", width: 56, height: 56 }}
          />
        }
        title={`${capitalize(props.surname ?? "")} ${(props.lastname ?? "").toUpperCase()}, ${props.money ?? 0}$`}
      />
    </Card>
  );
};

export default UserShortDisplay;
