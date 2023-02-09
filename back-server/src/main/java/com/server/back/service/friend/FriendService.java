package com.server.back.service.friend;

import java.util.List;

import com.server.back.domain.friend.Message;
import com.server.back.dto.friend.FRequestDto;
import com.server.back.dto.friend.FRequestResponseDto;
import com.server.back.dto.friend.FriendResponseDto;
import com.server.back.dto.friend.MessageRequestDto;
import com.server.back.dto.friend.MessageResponseDto;

public interface FriendService  {

	List<FriendResponseDto> friendList(Long userId);

	void deleteFriend(Long my_id, Long you_id);

	void bestFriend(Long my_id, Long you_id);

	List<FRequestResponseDto> frequestList(Long my_id);

	void requestFriend(FRequestDto requestDto);

	void acceptFriend(Long fRequestId);

	void refuseFriend(Long fRequestId);

	List<FriendResponseDto> searchFriend(Long userId, String fNickname);

	List<Message> findChat(Long chat_id);

	Message saveMessage(MessageRequestDto requestDto);

	Boolean checkFriend(FRequestDto requestDto);

	Boolean checkFriendRequest(FRequestDto requestDto);

	Boolean checkFriendToNickname(String username, String nickname);

	Boolean checkFriendRequestToNickname(String username, String nickname);

	void requestFriendToNickname(String username, String nickname);

	Boolean checkUser(String username, String nickname);

}
