package com.server.back.dto.friend;

import com.server.back.domain.friend.Chat;
import com.server.back.domain.friend.Message;
import com.server.back.domain.user.User;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MessageRequestDto {

	private Long chat_id;
	
	private Long user_id;
	
	private String content;
	
	public Message toEntity(Chat chatId, User userId , String content) {
		return Message.builder()
				.chatId(chatId)
				.userId(userId)
				.content(content)
				.build();
	}
	
}
