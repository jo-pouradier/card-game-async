import { ChangeEvent, useState } from "react";
import {
  Button,
  ButtonProps,
  Form,
  Header,
  InputOnChangeData,
} from "semantic-ui-react";

export interface ICardForm {
  descriptionPrompt: string;
  imagePrompt: string;
}

export const CardForm = (_props: unknown) => {
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

  const submitCard = (
    _event: React.MouseEvent<HTMLButtonElement>,
    _data: ButtonProps,
  ) => {
    console.log(currentCardPrompt);
    // props.submitUserHandler(data);
  }

  const generateCard = () => {
    console.log("generate card");
  }

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
      <Button onClick={generateCard}>
        Generate
      </Button>
      <Button type="submit" onClick={submitCard}>
        Submit
      </Button>
    </Form>
  );
};
