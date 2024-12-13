package com.cpe.springboot.notification.model;

import com.cpe.springboot.common.tools.JSONConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class CardGenerationNotificationMessage implements INotificationMessage {
    private int cardId;

    public CardGenerationNotificationMessage(int cardId) {
        this.cardId = cardId;
    }

    @Override
    @JsonIgnore
    public String getMessage() {
        return JSONConverter.toJSON(this);
    }

    @Override
    public CardGenerationNotificationMessage createMessage(String message) {
        return JSONConverter.fromJSON(message, CardGenerationNotificationMessage.class);
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }
}
