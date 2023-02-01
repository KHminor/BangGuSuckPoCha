package com.server.back.dto.friend;

import com.server.back.domain.friend.Friend;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
public class FriendResponseDto {
	
	private Long friend_id;
	private Long you_id;
	private Boolean best_friend;
	private Long chat_id;
	private String f_nickname;
	
	@Builder
	public FriendResponseDto(Friend friend) {
		this.friend_id=friend.getFriendId();
		this.you_id=friend.getYourId().getUserId();
		this.best_friend=friend.getBestFriend();
		this.f_nickname=friend.getYourId().getNickname();
		
	}

}
