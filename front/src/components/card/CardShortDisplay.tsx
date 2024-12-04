import { Box, Avatar, Typography } from "@mui/material";

export type CardShortDisplayProps = {
  image: string;
  name: string;
  family: string;
};

export const CardShortDisplay = (props: CardShortDisplayProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Avatar
        src={props.image}
        alt={props.name}
        sx={{ width: 56, height: 56 }}
      />
      <Box>
        <Typography variant="body1" fontWeight="bold">
          {props.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {props.family}
        </Typography>
      </Box>
    </Box>
  );
};
