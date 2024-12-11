package com.cpe.springboot.generation;

public class ImageGenerationDTO extends GenerationDTOAbstact {
    private String imagePrompt;
    private String imgUrl;

    public ImageGenerationDTO() {
        super(0);
    }

    public ImageGenerationDTO(int cardId, String imagePrompt) {
        super(cardId);
        this.imagePrompt = imagePrompt;
    }

    public ImageGenerationDTO(int cardId, String imagePrompt, String imgUrl) {
        super(cardId);
        this.imagePrompt = imagePrompt;
        this.imgUrl = imgUrl;
    }

    public String getImagePrompt() {
        return imagePrompt;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImagePrompt(String imagePrompt) {
        this.imagePrompt = imagePrompt;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    @Override
    public GenerationType getGenerationType() {
        return GenerationType.IMAGE;
    }
}
