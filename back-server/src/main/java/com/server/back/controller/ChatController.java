package com.server.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.server.back.domain.friend.Chat;
import com.server.back.domain.friend.ChatRepository;
import com.server.back.domain.friend.MessageRepository;
import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.friend.MessageRequestDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatController {
	
	private final ChatRepository chatRepository;
	private final UserRepository userRepository;
	private final MessageRepository messageRepository;

	@MessageMapping("/comm/message/{chat_id}")
	@SendTo("/sub/comm/room/{chat_id}")
	public void message(@DestinationVariable Long chat_id, MessageRequestDto requestDto) {
		//DB에 채팅내용 저장
		Chat chat = chatRepository.findByChatId(chat_id);
		User user = userRepository.findByUserId(requestDto.getUser_id());
		messageRepository.save(requestDto.toEntity(chat, user, requestDto.getContent()));
	}

}
