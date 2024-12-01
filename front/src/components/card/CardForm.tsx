import { ChangeEvent, useState } from "react";
import {
  Button,
  Form,
  Header,
  InputOnChangeData
} from "semantic-ui-react";

export interface ICardForm {
  descriptionPrompt: string;
  imagePrompt: string;
}

export type CardFormProps = {
  submitCardHandler?: (card: ICardForm) => void;
  generateCardHanlder?: (card: ICardForm) => void;
};

export const CardForm = (props: CardFormProps) => {
  const [currentCardPrompt, setCurrentCardPrompt] = useState<ICardForm>({
    descriptionPrompt: "",
    imagePrompt: "",
  });

  function processInput(
    event: ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) {
    const name = event.currentTarget.name;

    setCurrentCardPrompt((prevCard) => ({
      ...prevCard,
      [name]: data.value,
    }));
  }

  const submitCardHandler = (
    currentCardPrompt: ICardForm,
  ) => {
    console.log(currentCardPrompt);
    if (props.submitCardHandler) {
      props.submitCardHandler(currentCardPrompt);
    }
  };

  const generateCard = () => {
    console.log("generate card");
    if (props.generateCardHanlder) {
      props.generateCardHanlder(currentCardPrompt);
    }
  };

  return (
    <Form>
      <Header as="h4" dividing>
        Card Registration
      </Header>
      <Form.Field>
        <Form.Input
          fluid
          label="Description Prompt"
          placeholder="Description"
          name="descriptionPrompt"
          autoComplete="description"
          onChange={processInput}
          value={currentCardPrompt.descriptionPrompt}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          fluid
          label="Image Prompt"
          placeholder="Image"
          name="imagePrompt"
          autoComplete="image"
          onChange={processInput}
          value={currentCardPrompt.imagePrompt}
        />
      </Form.Field>
      <Button onClick={generateCard}>Generate</Button>
      <Button
        type="submit"
        onClick={() => submitCardHandler(currentCardPrompt)}
      >
        Submit
      </Button>
    </Form>
  );
};
