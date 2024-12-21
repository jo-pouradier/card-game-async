package com.cpe.springboot.user.controller;

import com.cpe.springboot.user.model.AuthDTO;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserMapper;
import com.cpe.springboot.user.model.UserModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//ONLY FOR TEST NEED ALSO TO ALLOW CROOS ORIGIN ON WEB BROWSER SIDE
@CrossOrigin
@RestController
public class UserRestController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserRestController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/users")
    private List<UserDTO> getAllUsers() {
        List<UserDTO> uDTOList = new ArrayList<UserDTO>();
        for (UserModel uM : userService.getAllUsers()) {
            uDTOList.add(userMapper.toDto(uM));
        }
        return uDTOList;

    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}")
    private UserDTO getUser(@PathVariable String id) {
        Optional<UserModel> ruser;
        ruser = userService.getUser(id);
        if (ruser.isPresent()) {
            return userMapper.toDto(ruser.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id:" + id + ", not found", null);

    }

    @RequestMapping(method = RequestMethod.POST, value = "/user")
    public UserDTO addUser(@RequestBody UserDTO user) {
        return userService.addUser(user);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/user/{id}")
    public UserDTO updateUser(@RequestBody UserDTO user, @PathVariable String id) {
        user.setId(Integer.valueOf(id));
        return userService.updateUser(user);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/user/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/auth")
    private Integer getAllCourses(@RequestBody AuthDTO authDto) {
        List<UserModel> uList = userService.getUserByLoginPwd(authDto.getUsername(), authDto.getPassword());
        if (uList.size() > 0) {

            return uList.get(0).getId();
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Authentification Failed", null);

    }


}
