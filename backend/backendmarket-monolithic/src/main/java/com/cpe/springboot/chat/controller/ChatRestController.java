package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.ChatMessageDTO;
import com.cpe.springboot.chat.model.ChatRoomDTO;
import com.cpe.springboot.chat.model.mapping.ChatMessageMapper;
import com.cpe.springboot.chat.model.mapping.ChatRoomMapper;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.StreamSupport;

//ONLY FOR TEST NEED ALSO TO ALLOW CROOS ORIGIN ON WEB BROWSER SIDE
@CrossOrigin
@RestController(value = "/chat")
public class ChatRestController {

    private final ChatRoomService chatRoomService;

    private final ChatMessagesService chatMessagesService;

    private final ChatRoomMapper chatRoomMapper;

    private final ChatMessageMapper chatMessageMapper;

    public ChatRestController(ChatRoomService chatRoomService, ChatMessagesService chatMessagesService, ChatRoomMapper chatRoomMapper, ChatMessageMapper chatMessageMapper) {
        this.chatRoomService = chatRoomService;
        this.chatMessagesService = chatMessagesService;
        this.chatRoomMapper = chatRoomMapper;
        this.chatMessageMapper = chatMessageMapper;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/chat/rooms")
    private List<Object> getRooms(@RequestParam(value = "full", defaultValue = "false") boolean full) {
        return StreamSupport.stream(chatRoomService.getRooms().spliterator(), true)
                .map(full ? chatRoomMapper::toFullDto : chatRoomMapper::toDto)
                .toList();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/chat/room/{uuid}")
    private ChatRoomDTO getRoom(@PathVariable UUID uuid) {
        return chatRoomMapper.toDto(chatRoomService.getRoom(uuid));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/chat/messages/room/{roomUuid}")
    private List<ChatMessageDTO> getMessages(@PathVariable UUID roomUuid) {
        return StreamSupport.stream(chatMessagesService.getChatMessagesByRoom(roomUuid).spliterator(), true)
                .map(chatMessageMapper::toDto)
                .sorted(
                        Comparator.comparingLong(ChatMessageDTO::getTimestamp)
                )
                .toList();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/chat/messages/{uuid}")
    private ChatMessageDTO getMessage(@PathVariable UUID uuid) {
        return chatMessageMapper.toDto(chatMessagesService.getChatMessage(uuid));
    }


}
