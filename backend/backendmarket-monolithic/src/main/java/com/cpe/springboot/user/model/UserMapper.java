package com.cpe.springboot.user.model;

import com.cpe.springboot.card.controller.CardModelRepository;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.common.tools.DtoMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements DtoMapper<UserModel, UserDTO> {

    private final CardModelRepository cardRepository;

    public UserMapper(CardModelRepository cardRepository) {
        this.cardRepository = cardRepository;
    }


    @Override
    public UserDTO toDto(UserModel entity) {
        return toDto(entity, true);
    }

    public UserDTO toDto(UserModel entity, boolean hidePwd) {
        UserDTO uDTO = new UserDTO();
        uDTO.setId(entity.getId());
        uDTO.setLogin(entity.getLogin());
        uDTO.setPwd(entity.getPwd());
        uDTO.setAccount(entity.getAccount());
        uDTO.setLastName(entity.getLastName());
        uDTO.setSurName(entity.getSurName());
        uDTO.setEmail(entity.getEmail());
        for (CardModel card : entity.getCardList()) {
            uDTO.getCardList().add(card.getId());
        }
        return hidePwd ? uDTO.hidePwd() : uDTO;
    }

    @Override
    public UserModel toEntity(UserDTO dto) {
        UserModel um = new UserModel(dto);
        um.setId(dto.getId());
        um.setLogin(dto.getLogin());
        um.setPwd(dto.getPwd());
        um.setAccount(dto.getAccount());
        um.setLastName(dto.getLastName());
        um.setSurName(dto.getSurName());
        um.setEmail(dto.getEmail());
        for (Integer cardId : dto.getCardList()) {
            CardModel card = cardRepository.findById(cardId).orElseThrow(() -> new IllegalArgumentException("Card " + cardId + " not found"));
            um.addCard(card);
        }
        return um;
    }


}
