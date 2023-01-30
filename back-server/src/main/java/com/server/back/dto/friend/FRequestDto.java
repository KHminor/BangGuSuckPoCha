package com.server.back.dto.friend;


import com.server.back.domain.friend.FRequest;
import com.server.back.domain.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class FRequestDto {

	private Long to_id;
	private Long from_id;
	
	@Builder
	public FRequestDto(Long to_id, Long from_id) {
		this.to_id = to_id;
		this.from_id = from_id;
	}
	
	public FRequest toEntity(User toId, User fromId) {
		return FRequest.builder()
				.toId(toId)
				.fromId(fromId)
				.build();
	}
}
