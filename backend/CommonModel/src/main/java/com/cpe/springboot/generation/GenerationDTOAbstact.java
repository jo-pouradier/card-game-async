package com.cpe.springboot.generation;

import java.io.Serializable;

public abstract class GenerationDTOAbstact {

    private int cardId;

    public GenerationDTOAbstact() {
    }

    public GenerationDTOAbstact(int cardId) {
        this.cardId = cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public int getCardId() {
        return cardId;
    }

    public abstract GenerationType getGenerationType();
}
