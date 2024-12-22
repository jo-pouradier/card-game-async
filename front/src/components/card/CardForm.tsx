import { ChangeEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks.ts";
import { selectUser } from "../../slices/userSlice.ts";

export interface ICardForm {
  descriptionPrompt: string;
  imagePrompt: string;
  userId: number;
}

export interface CardFormProps {
  generateCardHanlder?: (card: ICardForm) => void;
  isWaitingForGeneration?: boolean;
}

const CardForm = (props: CardFormProps) => {
  const user = useAppSelector(selectUser);
  const [currentCardPrompt, setCurrentCardPrompt] = useState<ICardForm>({
    descriptionPrompt: "",
    imagePrompt: "",
    userId: user.id,
  });

  const processInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCurrentCardPrompt((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const generateCardHandler = () => {
    console.log("generate card");
    if (props.generateCardHanlder) {
      props.generateCardHanlder(currentCardPrompt);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
        marginBottom: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Card Registration
      </Typography>
      <TextField
        fullWidth
        label="Description Prompt"
        placeholder="Description"
        name="descriptionPrompt"
        autoComplete="description"
        onChange={processInput}
        value={currentCardPrompt.descriptionPrompt}
      />
      <TextField
        fullWidth
        label="Image Prompt"
        placeholder="Image"
        name="imagePrompt"
        autoComplete="image"
        onChange={processInput}
        value={currentCardPrompt.imagePrompt}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        {props.isWaitingForGeneration ? (
          <Button variant="outlined" color="primary">
            Generating...
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={generateCardHandler}
          >
            Generate (100$)
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CardForm;
