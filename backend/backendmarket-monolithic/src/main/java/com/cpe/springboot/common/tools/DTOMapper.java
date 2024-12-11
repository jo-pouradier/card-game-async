package com.cpe.springboot.common.tools;

import com.cpe.springboot.card.model.CardDTO;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.card_generator.controller.CardGeneratorModel;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;

public class DTOMapper {

    public static CardDTO fromCardModelToCardDTO(CardModel cM) {
        CardDTO cDTO = new CardDTO();
        cDTO.setId(cM.getId());
        cDTO.setName(cM.getName());
        cDTO.setDescription(cM.getDescription());
        cDTO.setFamily(cM.getFamily());
        cDTO.setAffinity(cM.getAffinity());
        cDTO.setEnergy(cM.getEnergy());
        cDTO.setHp(cM.getHp());
        cDTO.setDefence(cM.getDefence());
        cDTO.setAttack(cM.getAttack());
        cDTO.setImgUrl(cM.getImgUrl());
        cDTO.setPrice(cM.getPrice());
        return cDTO;
    }

    public static CardDTO fromCardGeneratorModelToCardDTO(CardGeneratorModel cM) {
        CardDTO cDTO = new CardDTO();
        cDTO.setId(cM.getId());
        cDTO.setName(cM.getName());
        cDTO.setDescription(cM.getDescription());
        cDTO.setFamily(cM.getFamily());
        cDTO.setAffinity(cM.getAffinity());
        cDTO.setEnergy(cM.getEnergy());
        cDTO.setHp(cM.getHp());
        cDTO.setDefence(cM.getDefence());
        cDTO.setAttack(cM.getAttack());
        cDTO.setImgUrl(cM.getImgUrl());
        cDTO.setPrice(cM.getPrice());
        return cDTO;
    }

    public static CardModel fromCardDtoToCardModel(CardDTO cD) {
        CardModel cm = new CardModel(cD);
        cm.setEnergy(cD.getEnergy());
        cm.setHp(cD.getHp());
        cm.setDefence(cD.getDefence());
        cm.setAttack(cD.getAttack());
        cm.setPrice(cD.getPrice());
        cm.setId(cD.getId());
        return cm;
    }


    public static UserDTO fromUserModelToUserDTO(UserModel uM) {
        UserDTO uDto = new UserDTO(uM);
        return uDto;
    }

}
