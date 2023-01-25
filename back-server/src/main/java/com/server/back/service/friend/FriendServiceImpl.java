package com.server.back.service.friend;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.back.domain.friend.FRequest;
import com.server.back.domain.friend.FRequestRepository;
import com.server.back.domain.friend.Friend;
import com.server.back.domain.friend.FriendRepository;
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

	@Override
	public List<FriendResponseDto> friendList(Long userId) {
		List<Friend> entity =friendRepository.findByMyId(userId);
		List<FriendResponseDto> friends = entity.stream()
				.map(m -> new FriendResponseDto(m)).collect(Collectors.toList());
		return friends;
	}

	@Override
	public void deleteFriend(String username, Long you_id) {
		// Long MyId = userRepository.findByUsername(username).getUserId();
		// Long MyFriendId = friendRepository.findByMyIdAndYourId(MyId, you_id).getFriendId();
		// Long YourFriendId = friendRepository.findByMyIdAndYourId(you_id, MyId).getFriendId();
		
	}

	@Override
	public void bestFriend(String username, Long you_id) {
//		Long MyId = userRepository.findByUsername(username).getUserId();
//		FriendEntity friend = friendRepository.findByMyIdAndYourId(MyId, you_id);
//		friend.update();
		
	}

	@Override
	public List<FRequestResponseDto> frequestList(String username) {
		//Long userId = userRepository.findByUsername(username).getUserId();
		//List<FRequestEntity> entity = fRequestRepository.findByToId(userId);
		//List<FRequestResponseDto> requestFriend = entity.stream()
		//		.map(m -> new FRequestResponseDto(m))
		//				.collect(Collectors.toList());
		//return requestFriend;
		return null;
	}

	@Override
	public void requestFriend(FRequestDto requestDto) {
		fRequestRepository.save(requestDto.toEntity()).getFriendRequestId();
	}

	@Override
	public void acceptFriend(Long fRequestId) {
		FRequest entity = fRequestRepository.findByFriendRequestId(fRequestId);
		
		Friend my =  Friend.builder()
				.myId(entity.getToId())
				.yourId(entity.getFromId())
				.bestFriend(false)
				.build();
		
		Friend you = Friend.builder()
				.myId(entity.getFromId())
				.yourId(entity.getToId())
				.bestFriend(false)
				.build();
		
		// 친구 추가 ( 각자 )
		friendRepository.save(my);
		friendRepository.save(you);
		
		// 친구 요청 삭제
		fRequestRepository.delete(entity);
		
	}

	@Override
	public void refuseFriend(Long fRequestId) {
		fRequestRepository.deleteByFriendRequestId(fRequestId);
		
	}

	@Override
	public List<FriendResponseDto> searchFriend(Long userId, String fNickname) {
		List<Friend> entity =friendRepository.findByMyId(userId);
		List<FriendResponseDto> search = new ArrayList<>();
	
		for(Friend f : entity) {
			/*
			 if(f.getYour().getNickname.contains(fNickname)) {
			 	search.add(new FriendResponseDto(f));
			 }
			 */
		}
		return search;
	}

}
