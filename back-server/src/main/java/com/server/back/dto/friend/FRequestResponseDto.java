package com.server.back.dto.friend;


import com.server.back.domain.friend.FRequest;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FRequestResponseDto {

	private Long f_request_id;
	private Long from_id;
	private String from_nickname;
	private String from_profile;
	
	@Builder
	public FRequestResponseDto(FRequest f_request) {
		this.f_request_id=f_request.getFriendRequestId();
		this.from_id=f_request.getFromId().getUserId();
		this.from_nickname=f_request.getFromId().getNickname();
		this.from_profile=f_request.getFromId().getProfile();
	}
}
