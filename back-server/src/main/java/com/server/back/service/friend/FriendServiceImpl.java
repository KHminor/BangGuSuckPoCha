package com.server.back.service.friend;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.back.domain.friend.Chat;
import com.server.back.domain.friend.ChatRepository;
import com.server.back.domain.friend.FRequest;
import com.server.back.domain.friend.FRequestRepository;
import com.server.back.domain.friend.Friend;
import com.server.back.domain.friend.FriendRepository;
import com.server.back.domain.friend.Message;
import com.server.back.domain.friend.MessageRepository;
import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.friend.FRequestDto;
import com.server.back.dto.friend.FRequestResponseDto;
import com.server.back.dto.friend.FriendResponseDto;
import com.server.back.dto.friend.MessageRequestDto;
import com.server.back.dto.friend.MessageResponseDto;
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
	private final MessageRepository messageRepository;
	
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
		
		
		// 메시지 삭제
		messageRepository.deleteByChatId_chatId(chat.getChatId());
		
		friendRepository.deleteByFriendId(MyFriendId);
		friendRepository.deleteByFriendId(YourFriendId);
		
		// 채팅방 삭제
		//chatRepository.deleteByChatId(chat.getChatId());
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
		chatRepository.save(chat).getChatId();
		
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

	// 채팅 내역
	@Override
	public List<Message> findChat(Long chat_id) {
		return messageRepository.findByChatId_chatId(chat_id);
	}
	

	// 채팅 메시지 저장
	@Override
	public Message saveMessage(MessageRequestDto requestDto) {
		Chat chat = chatRepository.findByChatId(requestDto.getChat_id());
		User user = userRepository.findByUserId(requestDto.getUser_id());
		Message message = requestDto.toEntity(chat, user, requestDto.getContent());
		messageRepository.save(message);
		return message;
	}

	
	// 친구인지 판별
	@Override
	public Boolean checkFriend(FRequestDto requestDto) {
		Friend isFriend = friendRepository.findByMyId_userIdAndYourId_userId(requestDto.getFrom_id(), requestDto.getTo_id());
		if(isFriend != null) {
			return true;
		}
		else {
			return false;
		}
	}

	// 요청 보냈는지 판별
	@Override
	public Boolean checkFriendRequest(FRequestDto requestDto) {
		FRequest isFrequest1 = fRequestRepository.findByFromId_userIdAndToId_userId(requestDto.getFrom_id(), requestDto.getTo_id());
		FRequest isFrequest2 = fRequestRepository.findByFromId_userIdAndToId_userId(requestDto.getTo_id(), requestDto.getFrom_id());
		if(isFrequest1 != null || isFrequest2 != null) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public Boolean checkFriendToNickname(String username, String nickname) {
		Friend isFriend = friendRepository.findByMyId_usernameAndYourId_nickname(username, nickname);
		if(isFriend != null) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public Boolean checkFriendRequestToNickname(String username, String nickname) {
		FRequest isFrequest1 = fRequestRepository.findByFromId_usernameAndToId_nickname(username, nickname);
		FRequest isFrequest2 = fRequestRepository.findByFromId_nicknameAndToId_username(nickname, username);
		if(isFrequest1 != null || isFrequest2 != null) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public void requestFriendToNickname(String username, String nickname) {
		User fromId = userRepository.findByUsername(username);
		User toId = userRepository.findByNickname(nickname);
		FRequestDto requestDto = new FRequestDto();
		fRequestRepository.save(requestDto.toEntity(toId, fromId));
		
	}

	@Override
	public Boolean checkUser(String username, String nickname) {
		User isUser = userRepository.findByNickname(nickname);
		
		if(isUser != null) {
			if(!isUser.getUsername().equals(username)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}


	
	
	
	
}
