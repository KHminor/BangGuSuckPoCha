package com.server.back.dto.friend;

import java.time.LocalDateTime;

import com.server.back.domain.friend.Message;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MessageResponseDto {
	private Long message_id;
	private Long user_id;
	private String content;
	private String user_nickname;
	private LocalDateTime create_at;
	
	@Builder
	public MessageResponseDto(Message message) {
		this.message_id = message.getMessageId();
		this.user_id = message.getUserId().getUserId();
		this.user_nickname = message.getUserId().getNickname();
		this.content = message.getContent();
		this.create_at = message.getCreateAt();
	}
}
