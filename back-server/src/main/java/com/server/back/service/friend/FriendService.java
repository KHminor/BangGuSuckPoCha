package com.server.back.service.friend;

import java.util.List;

import com.server.back.dto.friend.FRequestDto;
import com.server.back.dto.friend.FRequestResponseDto;
import com.server.back.dto.friend.FriendResponseDto;

public interface FriendService  {

	List<FriendResponseDto> friendList(Long userId);

	void deleteFriend(String username, Long you_id);

	void bestFriend(String username, Long you_id);

	List<FRequestResponseDto> frequestList(String username);

	void requestFriend(FRequestDto requestDto);

	void acceptFriend(Long fRequestId);

	void refuseFriend(Long fRequestId);

	List<FriendResponseDto> searchFriend(Long userId, String fNickname);

}
