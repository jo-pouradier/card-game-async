import { Container } from "@mui/material";
import { useState } from "react";
import CardSimpleDisplay, { CardSimpleDisplayProps } from "./CardSimpleDisplay";

export interface CardSelectProps extends CardSimpleDisplayProps {
    isSelected: boolean
    onSelection: (selected: boolean, cardId: number) => void
}

const CardSelect = (props: CardSelectProps) => {
    const [selected, setSelected] = useState<boolean>(props.isSelected)
    const handelClick = () => {
            setSelected(!selected)
            props.onSelection(!selected, props.id ?? 0)
    }
    return (
        <Container>

            <div onClick={() => handelClick() } style={{cursor: "pointer", boxShadow: selected ? "0 0 10px blue" : "none"}}>
            <CardSimpleDisplay {...props}></CardSimpleDisplay>
            {/* <Switch checked={props.isSelected} onChange={(_e, checked: boolean) => props.onSelection(checked, props.id ?? 0)}></Switch> */}
            </div>
        </Container>
    )
}

export default CardSelect