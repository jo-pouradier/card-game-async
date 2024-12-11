package com.cpe.springboot.generation;

public class TextGenerationDTO extends GenerationDTOAbstact {

    private String textPrompt;
    private String text;

    public TextGenerationDTO() {
        super(0);
    }

    public TextGenerationDTO(int cardId, String textPrompt) {
        super(cardId);
        this.textPrompt = textPrompt;
    }

    public TextGenerationDTO(int cardId, String textPrompt, String text) {
        super(cardId);
        this.textPrompt = textPrompt;
        this.text = text;
    }

    public String getTextPrompt() {
        return textPrompt;
    }

    public String getText() {
        return text;
    }

    public void setTextPrompt(String textPrompt) {
        this.textPrompt = textPrompt;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public GenerationType getGenerationType() {
        return GenerationType.TEXT;
    }
}
