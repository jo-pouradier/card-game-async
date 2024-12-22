package com.cpe.springboot.user.controller;

import com.cpe.springboot.card.controller.CardModelService;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserMapper;
import com.cpe.springboot.user.model.UserModel;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CardModelService cardModelService;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, CardModelService cardModelService, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.cardModelService = cardModelService;
        this.userMapper = userMapper;
    }

    public List<UserModel> getAllUsers() {
        List<UserModel> userList = new ArrayList<>();
        userRepository.findAll().forEach(userList::add);
        return userList;
    }

    public Optional<UserModel> getUser(String id) {
        return userRepository.findById(Integer.valueOf(id));
    }

    public Optional<UserModel> getUser(Integer id) {
        return userRepository.findById(id);
    }

    public UserDTO addUser(UserDTO user) {
        UserModel u = fromUDtoToUModel(user);
        // needed to avoid detached entity passed to persist error
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }
        UserModel u_saved = userRepository.save(u);
        List<CardModel> cardList = cardModelService.getRandCard(5);
        for (CardModel card : cardList) {
            u_saved.addCard(card);
        }
        // init money
        u_saved.setAccount(10000);
        UserModel uBd = userRepository.save(u_saved);
        return userMapper.toDto(uBd);
    }

    public UserDTO updateUser(UserDTO user) {
        UserModel u = fromUDtoToUModel(user);
        UserModel uBd = userRepository.save(u);
        return userMapper.toDto(uBd);
    }

    public UserDTO updateUser(UserModel user) {
        UserModel uBd = userRepository.save(user);
        return userMapper.toDto(uBd);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(Integer.valueOf(id));
    }

    public List<UserModel> getUserByLoginPwd(String login, String pwd) {
        List<UserModel> ulist = null;
        ulist = userRepository.findByLoginAndPwd(login, pwd);
        return ulist;
    }

    private UserModel fromUDtoToUModel(UserDTO user) {
        UserModel u = new UserModel(user);
        List<CardModel> cardList = new ArrayList<CardModel>();
        for (Integer cardId : user.getCardList()) {
            Optional<CardModel> card = cardModelService.getCard(cardId);
            if (card.isPresent()) {
                cardList.add(card.get());
            }
        }
        return u;
    }

    public void winBatte(int userId) {
        UserModel u = userRepository.findById(userId).get();
        u.setAccount(u.getAccount() + 100);
        userRepository.save(u);
    }
}
