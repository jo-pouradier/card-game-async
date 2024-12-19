package com.cpe.springboot.card.model;

import com.cpe.springboot.common.tools.DtoMapper;
import com.cpe.springboot.user.controller.UserRepository;
import com.cpe.springboot.user.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CardMapper implements DtoMapper<CardModel, CardDTO> {
    @Autowired
    private UserRepository userRepository;

    @Override
    public CardDTO toDto(CardModel entity) {
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
    public CardModel toEntity(CardDTO dto) {
        CardModel cm = new CardModel(dto);
        cm.setId(dto.getId());
        UserModel user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new IllegalArgumentException("User " + dto.getUserId() + " not found"));
        cm.setUser(user);
        return cm;
    }
}
