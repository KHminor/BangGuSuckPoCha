package com.server.back.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.back.domain.friend.Chat;
import com.server.back.domain.friend.ChatRepository;
import com.server.back.domain.friend.Message;
import com.server.back.domain.friend.MessageRepository;
import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.friend.FriendResponseDto;
import com.server.back.dto.friend.MessageRequestDto;
import com.server.back.dto.friend.MessageResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatController {
	
	private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
	
	private final ChatRepository chatRepository;
	private final UserRepository userRepository;
	private final MessageRepository messageRepository;

	// Client가 send 할 수 있는 경로
	// 입장
	@GetMapping("/chat/{chat_id}")
	public ResponseEntity<Map<String, Object>> friendList(@PathVariable(value = "chat_id") Long chat_id){
    	Map<String, Object> response = new HashMap<>();
    	List<Message> message = messageRepository.findByChatId_chatId(chat_id);
    	List<MessageResponseDto> messageResponseDto = message.stream().map(m -> new MessageResponseDto(m)).collect(Collectors.toList());
    	response.put("data",messageResponseDto);
    	response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
	
	@MessageMapping(value = "/chat/message")
	public void message(MessageRequestDto requestDto) {
		System.out.println("###################################");
		System.out.println(requestDto.getChat_id().TYPE);
		
		//DB에 채팅내용 저장
		Chat chat = chatRepository.findByChatId(requestDto.getChat_id());
		User user = userRepository.findByUserId(requestDto.getUser_id());
		Message message = requestDto.toEntity(chat, user, requestDto.getContent());
		messageRepository.save(message);
		
		MessageResponseDto responseDto = MessageResponseDto.builder().message(message).build();
		
		template.convertAndSend("/sub/chat/" + chat.getChatId(), responseDto);
	}
	
	

}
