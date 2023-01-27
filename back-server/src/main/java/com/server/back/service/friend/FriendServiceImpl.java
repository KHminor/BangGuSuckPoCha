package com.server.back.service.friend;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.back.domain.friend.Chat;
import com.server.back.domain.friend.ChatRepository;
import com.server.back.domain.friend.FRequest;
import com.server.back.domain.friend.FRequestRepository;
import com.server.back.domain.friend.Friend;
import com.server.back.domain.friend.FriendRepository;
import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.friend.FRequestDto;
import com.server.back.dto.friend.FRequestResponseDto;
import com.server.back.dto.friend.FriendResponseDto;
import com.server.back.dto.pocha.PochaResponseDto;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
@Transactional
public class FriendServiceImpl implements FriendService {
	
	private final FriendRepository friendRepository;
	private final FRequestRepository fRequestRepository;
	private final UserRepository userRepository;
	private final ChatRepository chatRepository;
	
	// 친구 목록
	@Override
	public List<FriendResponseDto> friendList(Long userId) {
		List<Friend> entity =friendRepository.findByMyId_userId(userId);
		List<FriendResponseDto> friends = entity.stream()
				.map(m -> new FriendResponseDto(m)).collect(Collectors.toList());
		return friends;
	}
	
	// 친구 검색
	@Override
	public List<FriendResponseDto> searchFriend(Long userId, String fNickname) {
		List<Friend> entity =friendRepository.findByMyId_userId(userId);
		List<FriendResponseDto> search = new ArrayList<>();
	
		for(Friend f : entity) {
			
			 if(f.getYourId().getNickname().contains(fNickname)) {
			 	search.add(new FriendResponseDto(f));
			 }
			 
		}
		return search;
	}
	
	// 친구 삭제
	@Override
	public void deleteFriend(Long my_id, Long you_id) {
		Chat chat = friendRepository.findByMyId_userIdAndYourId_userId(my_id, you_id).getChatId();
		Long MyFriendId = friendRepository.findByMyId_userIdAndYourId_userId(my_id, you_id).getFriendId();
		Long YourFriendId = friendRepository.findByMyId_userIdAndYourId_userId(you_id, my_id).getFriendId();
		friendRepository.deleteByFriendId(MyFriendId);
		friendRepository.deleteByFriendId(YourFriendId);
		chatRepository.delete(chat);
		
	}

	// 친한친구(즐겨찾기)
	@Override
	public void bestFriend(Long my_id, Long you_id) {
		Friend friend = friendRepository.findByMyId_userIdAndYourId_userId(my_id, you_id);
		friend.update();
	}

	//친구 요청 목록
	@Override
	public List<FRequestResponseDto> frequestList(Long my_id) {
		List<FRequest> entity = fRequestRepository.findByToId_userId(my_id);
		List<FRequestResponseDto> requestFriend = entity.stream()
				.map(m -> new FRequestResponseDto(m))
						.collect(Collectors.toList());
		return requestFriend;
	}

	// 친구 요청 보내기
	@Override
	public void requestFriend(FRequestDto requestDto) {
		User toId = userRepository.findByUserId(requestDto.getTo_id());
		User fromId = userRepository.findByUserId(requestDto.getFrom_id());
		fRequestRepository.save(requestDto.toEntity(toId, fromId));
	}
	

	// 친구 수락
	@Override
	public void acceptFriend(Long fRequestId) {
		FRequest entity = fRequestRepository.findByFriendRequestId(fRequestId);
		
		Chat chat = Chat.builder()
					.userId(entity.getToId())
					.user2Id(entity.getFromId())
					.build();
		
		chatRepository.save(chat);
		
		Friend my =  Friend.builder()
				.myId(entity.getToId())
				.yourId(entity.getFromId())
				.bestFriend(false)
				.chatId(chat)
				.build();
		
		Friend you = Friend.builder()
				.myId(entity.getFromId())
				.yourId(entity.getToId())
				.bestFriend(false)
				.chatId(chat)
				.build();
		
		// 친구 추가 ( 각자 )
		friendRepository.save(my);
		friendRepository.save(you);
		
		// 친구 요청 삭제
		fRequestRepository.delete(entity);
		
	}

	// 친구 거절
	@Override
	public void refuseFriend(Long fRequestId) {
		fRequestRepository.deleteByFriendRequestId(fRequestId);
	
	}
	
	// 채팅 불러오기


	// 채팅 보내기
	
}
