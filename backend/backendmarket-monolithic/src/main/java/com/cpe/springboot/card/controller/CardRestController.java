package com.cpe.springboot.card.controller;

import com.cpe.springboot.card.model.CardDTO;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.common.tools.DTOMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//ONLY FOR TEST NEED ALSO TO ALLOW CROOS ORIGIN ON WEB BROWSER SIDE
@CrossOrigin
@RestController

public class CardRestController {
    private final DTOMapper dtoMapper;
    private final CardModelService cardModelService;

    public CardRestController(DTOMapper dtoMapper, CardModelService cardModelService) {
        this.dtoMapper = dtoMapper;
        this.cardModelService = cardModelService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/cards")
    private List<CardDTO> getAllCards() {
        List<CardDTO> cLightList = new ArrayList<>();
        for (CardModel c : cardModelService.getAllCardModel()) {
            cLightList.add(dtoMapper.fromCardModelToCardDTO(c));
        }
        return cLightList;

    }

    @RequestMapping(method = RequestMethod.GET, value = "/card/{id}")
    private CardDTO getCard(@PathVariable String id) {
        Optional<CardModel> rcard;
        rcard = cardModelService.getCard(Integer.valueOf(id));
        if (rcard.isPresent()) {
            return dtoMapper.fromCardModelToCardDTO(rcard.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Card id:" + id + ", not found", null);

    }

    @RequestMapping(method = RequestMethod.POST, value = "/card")
    public CardDTO addCard(@RequestBody CardDTO card) {
        return cardModelService.addCard(dtoMapper.fromCardDtoToCardModel(card));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/card/{id}")
    public CardDTO updateCard(@RequestBody CardDTO card, @PathVariable String id) {
        card.setId(Integer.valueOf(id));
        return cardModelService.updateCard(dtoMapper.fromCardDtoToCardModel(card));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/card/{id}")
    public void deleteUser(@PathVariable String id) {
        cardModelService.deleteCardModel(Integer.valueOf(id));
    }


}
