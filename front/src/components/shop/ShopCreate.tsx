import {Container} from "@mui/material";
import CardForm, {ICardForm} from "../card/CardForm";
import CardSimpleDisplay from "../card/CardSimpleDisplay";
import ICard from "../../types/ICard";
import {useState} from "react";
import {useAppSelector} from "../../hooks.ts";
import {selectUser} from "../../slices/userSlice.ts";

const ShopCreate = () => {
        const user = useAppSelector(selectUser);
        const [generatedCard, setGeneratedCard] = useState<ICard>({
            id: 0,
            name: "",
            family: "",
            description: "",
            hp: 0,
            energy: 0,
            defense: 0,
            attack: 0,
            price: 0,
            imgUrl: "",
            affinity: "",
            smallImgUrl: "",
            userId: user.id,
        });

        const generateCardHanlder = (card: ICardForm) => {
            console.log("generate card: ", card);
            fetch("/api/store/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(card),
            }).then((reponse) => {
                console.log("Success:", reponse);
            }).catch((error) => {
                console.error("Error:", error);
            });
        };


        return (
            <Container>
                <CardForm
                    generateCardHanlder={generateCardHanlder}
                />
                <CardSimpleDisplay
                    id={generatedCard.id}
                    name={generatedCard.name}
                    family={generatedCard.family}
                    description={generatedCard.description}
                    hp={generatedCard.hp}
                    energy={generatedCard.energy}
                    defense={generatedCard.defense}
                    attack={generatedCard.attack}
                    price={generatedCard.price}
                    imgUrl={generatedCard.imgUrl}
                />
            </Container>
        );
    }
;

export default ShopCreate;
