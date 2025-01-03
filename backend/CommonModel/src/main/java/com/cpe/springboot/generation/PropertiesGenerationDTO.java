package com.cpe.springboot.generation;

import java.io.Serializable;

public class PropertiesGenerationDTO extends GenerationDTOAbstact implements Serializable {
    private String imgUrl;
    private float energy;
    private float hp;
    private float attack;
    private float defence;

    public PropertiesGenerationDTO() {
        super(0);
    }

    public PropertiesGenerationDTO(int cardId, String imgUrl) {
        super(cardId);
        this.imgUrl = imgUrl;
    }

    public String getImgUrl() {
        return this.imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public float getEnergy() {
        return this.energy;
    }

    public void setEnergy(float energy) {
        this.energy = energy;
    }

    public float getHp() {
        return this.hp;
    }

    public void setHp(float hp) {
        this.hp = hp;
    }

    public float getAttack() {
        return this.attack;
    }

    public void setAttack(float attack) {
        this.attack = attack;
    }

    public float getDefence() {
        return this.defence;
    }

    public void setDefence(float defence) {
        this.defence = defence;
    }

    @Override
    public GenerationType getGenerationType() {
        return GenerationType.PROPERTY;
    }
}
