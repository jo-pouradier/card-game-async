package com.cpe.springboot.card_generator.model;

import com.cpe.springboot.card.model.CardDTO;
import com.cpe.springboot.common.tools.DtoMapper;

public class CardGeneratorMapper implements DtoMapper<CardGeneratorModel, CardDTO> {

    @Override
    public CardDTO toDto(CardGeneratorModel entity) {
        CardDTO cDTO = new CardDTO();
        cDTO.setId(entity.getId());
        cDTO.setName(entity.getName());
        cDTO.setDescription(entity.getDescription());
        cDTO.setFamily(entity.getFamily());
        cDTO.setAffinity(entity.getAffinity());
        cDTO.setEnergy(entity.getEnergy());
        cDTO.setHp(entity.getHp());
        cDTO.setDefence(entity.getDefence());
        cDTO.setAttack(entity.getAttack());
        cDTO.setImgUrl(entity.getImgUrl());
        cDTO.setPrice(entity.getPrice());
        cDTO.setUserId(entity.getUser().getId());
        return cDTO;
    }

    @Override
    public CardGeneratorModel toEntity(CardDTO dto) {
        throw new UnsupportedOperationException("Should not be called");
    }
}
