package com.cpe.springboot.store.model;

public class CardGeneratorDTO {

    private String descriptionPrompt;
    private String imagePrompt;
    private int userId;

    public CardGeneratorDTO() {
    }

    public String getDescriptionPrompt() {
        return descriptionPrompt;
    }

    public void setDescriptionPrompt(String descriptionPrompt) {
        this.descriptionPrompt = descriptionPrompt;
    }

    public String getImagePrompt() {
        return imagePrompt;
    }

    public void setImagePrompt(String imagePrompt) {
        this.imagePrompt = imagePrompt;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
