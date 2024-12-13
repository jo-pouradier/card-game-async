package com.cpe.springboot.common.tools;

import com.cpe.springboot.card.model.CardDTO;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.card_generator.controller.CardGeneratorModel;
import com.cpe.springboot.chat.model.ChatMessage;
import com.cpe.springboot.chat.model.ChatMessageDTO;
import com.cpe.springboot.chat.model.Room;
import com.cpe.springboot.chat.model.RoomDTO;
import com.cpe.springboot.user.controller.UserRepository;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DTOMapper {
    private final UserRepository userRepository;

    public DTOMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public CardDTO fromCardModelToCardDTO(CardModel cM) {
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
        cDTO.setUserId(cM.getUser().getId());
        return cDTO;
    }

    public CardDTO fromCardGeneratorModelToCardDTO(CardGeneratorModel cM) {
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
        cDTO.setUserId(cM.getUser().getId());
        return cDTO;
    }

    public CardModel fromCardDtoToCardModel(CardDTO cD) {
        CardModel cm = new CardModel(cD);
        cm.setEnergy(cD.getEnergy());
        cm.setHp(cD.getHp());
        cm.setDefence(cD.getDefence());
        cm.setAttack(cD.getAttack());
        cm.setPrice(cD.getPrice());
        cm.setId(cD.getId());
        Optional<UserModel> user = userRepository.findById(Integer.valueOf(cD.getUserId()));
        if (user.isPresent()) {
            cm.setUser(user.get());
        } else {
            throw new IllegalArgumentException("User " + cD.getUserId() + " not found");
        }
        return cm;
    }


    public UserDTO fromUserModelToUserDTO(UserModel uM) {
        UserDTO uDto = new UserDTO(uM);
        return uDto;
    }

    public ChatMessageDTO fromChatMessageToChatMessageDTO(ChatMessage cM) {
        ChatMessageDTO cDTO = new ChatMessageDTO();
        cDTO.setId(cM.getId());
        cDTO.setContent(cM.getContent());
        cDTO.setTimestamp(cM.getTimestamp());
        cDTO.setUserId(cM.getUser().getId());
        cDTO.setRoomId(cM.getRoom().getId());
        return cDTO;
    }

    public RoomDTO fromRoomToRoomDTO(Room room) {
        RoomDTO rDTO = new RoomDTO();
        rDTO.setId(room.getId());
        rDTO.setName(room.getName());
        rDTO.setGlobal(room.isGlobal());
        rDTO.setUsers(room.getUsers().stream().map(this::fromUserModelToUserDTO).toList());
        rDTO.setMessages(room.getMessages().stream().map(this::fromChatMessageToChatMessageDTO).toList());
        return rDTO;
    }
}
