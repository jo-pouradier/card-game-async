package com.cpe.springboot.card_generator.model;


import com.cpe.springboot.card.model.CardBasics;
import com.cpe.springboot.card.model.CardDTO;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.store.model.StoreTransaction;
import com.cpe.springboot.user.model.UserModel;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class CardGeneratorModel extends CardBasics {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private float energy;
    private float hp;
    private float defence;
    private float attack;
    private float price;
    private String descriptionPrompt;
    private String imagePrompt;

    @ManyToOne
    @JoinColumn
    private UserModel user;
    @ManyToOne
    @JoinColumn
    private StoreTransaction store;

    private boolean imageGenerated = false;
    private boolean descriptionGenerated = false;
    private boolean propertiesGenerated = false;

    public CardGeneratorModel() {
        super();
    }

    public CardGeneratorModel(CardGeneratorModel cModel) {
        super(cModel);
        this.energy = cModel.getEnergy();
        this.hp = cModel.getHp();
        this.defence = cModel.getDefence();
        this.attack = cModel.getAttack();
        this.price = cModel.getPrice();
    }

    public CardGeneratorModel(CardBasics cardBasic) {
        super(cardBasic);
    }

    public CardGeneratorModel(CardDTO cardDTO) {
        super(new CardBasics(cardDTO.getName(), cardDTO.getDescription(), cardDTO.getFamily(), cardDTO.getAffinity(), cardDTO.getImgUrl(), cardDTO.getSmallImgUrl()));
        this.energy = cardDTO.getEnergy();
        this.hp = cardDTO.getHp();
        this.defence = cardDTO.getDefence();
        this.attack = cardDTO.getAttack();
        this.price = cardDTO.getPrice();
    }

    public CardGeneratorModel(String descriptionPrompt, String imagePrompt) {
        this.descriptionPrompt = descriptionPrompt;
        this.imagePrompt = imagePrompt;
    }

    public float getEnergy() {
        return energy;
    }

    public void setEnergy(float energy) {
        this.energy = energy;
    }

    public float getHp() {
        return hp;
    }

    public void setHp(float hp) {
        this.hp = hp;
    }

    public float getDefence() {
        return defence;
    }

    public void setDefence(float defence) {
        this.defence = defence;
    }

    public float getAttack() {
        return attack;
    }

    public void setAttack(float attack) {
        this.attack = attack;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public void setStore(StoreTransaction storeModel) {
        this.store = storeModel;
    }

    public StoreTransaction getStore() {
        return store;
    }

    public float computePrice() {
        return this.hp * 20 + this.defence * 20 + this.energy * 20 + this.attack * 20;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public boolean isImageGenerated() {
        return imageGenerated;
    }

    public void setImageGenerated(boolean imageGenerated) {
        this.imageGenerated = imageGenerated;
    }

    public boolean isDescriptionGenerated() {
        return descriptionGenerated;
    }

    public void setDescriptionGenerated(boolean descriptionGenerated) {
        this.descriptionGenerated = descriptionGenerated;
    }

    public boolean isPropertiesGenerated() {
        return propertiesGenerated;
    }

    public void setPropertiesGenerated(boolean propertiesGenerated) {
        this.propertiesGenerated = propertiesGenerated;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public boolean isResourcesGenerated() {
        return imageGenerated && descriptionGenerated && propertiesGenerated;
    }

    public CardModel toCardModel() {
        CardModel cardModel = new CardModel();
        cardModel.setName(super.getName());
        cardModel.setFamily(super.getFamily());
        cardModel.setAffinity(super.getAffinity());
        cardModel.setAttack(this.attack);
        cardModel.setDefence(this.defence);
        cardModel.setEnergy(this.energy);
        cardModel.setHp(this.hp);
        cardModel.setImgUrl(super.getImgUrl());
        cardModel.setSmallImgUrl(super.getSmallImgUrl());
        cardModel.setDescription(super.getDescription());
        cardModel.setUser(this.user);
        cardModel.setStore(this.store);
        cardModel.setPrice(cardModel.computePrice());
        return cardModel;
    }
}
