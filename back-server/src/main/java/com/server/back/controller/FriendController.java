package com.server.back.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.server.back.domain.friend.Chat;
import com.server.back.domain.friend.ChatRepository;
import com.server.back.domain.friend.Message;
import com.server.back.domain.user.User;
import com.server.back.dto.friend.FRequestDto;
import com.server.back.dto.friend.FRequestResponseDto;
import com.server.back.dto.friend.FriendResponseDto;
import com.server.back.dto.friend.MessageRequestDto;
import com.server.back.dto.friend.MessageResponseDto;
import com.server.back.service.friend.FriendService;
import com.server.back.service.user.UserService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/user/friend")
@RestController
public class FriendController {

	@Autowired
	private FriendService friendService;

	@Autowired
	private UserService userService;

	private final SimpMessagingTemplate template; // 특정 Broker로 메세지를 전달

	@ApiOperation(value = "친구 목록")
	@GetMapping("/{username}")
	public ResponseEntity<Map<String, Object>> friendList(@PathVariable(value = "username") String username) {
		Map<String, Object> response = new HashMap<>();
		Long userId = userService.findByUsername(username);
		List<FriendResponseDto> friendResponseDto = friendService.friendList(userId);
		response.put("data", friendResponseDto);
		response.put("message", "success");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "친구 목록 검색")
	@GetMapping("/{username}/{f_nickname}")
	public ResponseEntity<Map<String, Object>> friendSearchList(@PathVariable(value = "username") String username,
			@PathVariable(value = "f_nickname") String fNickname) {
		Map<String, Object> response = new HashMap<>();
		Long userId = userService.findByUsername(username);
		List<FriendResponseDto> friendResponseDto = friendService.searchFriend(userId, fNickname);
		response.put("data", friendResponseDto);
		response.put("message", "success");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "친구 삭제")
	@DeleteMapping("/{username}/{you_id}")
	public ResponseEntity<Map<String, Object>> friendDelete(@PathVariable(value = "username") String username,
			@PathVariable(value = "you_id") Long you_id) {
		Map<String, Object> response = new HashMap<>();
		Long my_id = userService.findByUsername(username);
		friendService.deleteFriend(my_id, you_id);
		response.put("message", "success");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "친한 친구 설정")
	@PutMapping("/{username}/{you_id}")
	public ResponseEntity<Map<String, Object>> friendUpdate(@PathVariable(value = "username") String username,
			@PathVariable(value = "you_id") Long you_id) {
		Map<String, Object> response = new HashMap<>();
		//
		Long my_id = userService.findByUsername(username);
		friendService.bestFriend(my_id, you_id);
		response.put("message", "success");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "친구 요청 목록")
	@GetMapping("/request/{username}")
	public ResponseEntity<Map<String, Object>> friendRequestList(@PathVariable(value = "username") String username) {
		Map<String, Object> response = new HashMap<>();
		Long my_id = userService.findByUsername(username);
		List<FRequestResponseDto> fRequestResponseDto = friendService.frequestList(my_id);
		response.put("data", fRequestResponseDto);
		response.put("message", "success");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "친구 요청")
	@PostMapping("/request")
	public ResponseEntity<Map<String, Object>> friendRequest(@RequestBody FRequestDto requestDto) {
		Map<String, Object> response = new HashMap<>();
		// 친구 유무 확인
		Boolean isFriend = friendService.checkFriend(requestDto);
		// 친구 요청 확인
		Boolean isFRequest = friendService.checkFriendRequest(requestDto);
		
		if(isFriend) {
			response.put("message", "isFriend");
			return new ResponseEntity<>(response, HttpStatus.OK);	
		}
		else if(isFRequest) {
			response.put("message", "isFRequest");
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
		else {
			friendService.requestFriend(requestDto);
			response.put("message", "success");
			return new ResponseEntity<>(response, HttpStatus.OK);	
		}
		
	}

	@ApiOperation(value = "닉네임으로 친구 요청 ")
	@PostMapping("/request/{username}/{nickname}")
	public ResponseEntity<Map<String, Object>> friendRequestNickname(@PathVariable(value = "username") String username, @PathVariable(value = "nickname") String nickname) {
		Map<String, Object> response = new HashMap<>();
		
		// 유저 찾기
		Boolean isUser = friendService.checkUser(username,nickname);
		if(isUser) {
			// 친구 유무 확인
			Boolean isFriend = friendService.checkFriendToNickname(username,nickname);
			// 친구 요청 확인 
			Boolean isFRequest = friendService.checkFriendRequestToNickname(username,nickname);
			
			if(isFriend) {
				response.put("message", "isFriend");	
			}
			else if(isFRequest) {
				response.put("message", "isFRequest");
			}
			else {
				friendService.requestFriendToNickname(username, nickname);
				response.put("message", "success");
			}
		}
		else {
			response.put("message", "checkNickname");
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}	
	
	
	@ApiOperation(value = "친구 요청 수락")
	@PostMapping("/accept/{f_request_id}")
	public ResponseEntity<Map<String, Object>> friendRequestAccept(
			@PathVariable(value = "f_request_id") Long f_request_id) {
		Map<String, Object> response = new HashMap<>();
		friendService.acceptFriend(f_request_id);
		response.put("message", "success");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "친구 요청 거절")
	@DeleteMapping("/refuse/{f_request_id}")
	public ResponseEntity<Map<String, Object>> friendRequestDelete(
			@PathVariable(value = "f_request_id") Long fRequestId) {
		Map<String, Object> response = new HashMap<>();
		friendService.refuseFriend(fRequestId);
		response.put("message", "success");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "채팅방 입장 및 채팅 내역 불러오기")
	@GetMapping("/chat/{chat_id}")
	public ResponseEntity<Map<String, Object>> friendList(@PathVariable(value = "chat_id") Long chat_id) {
		Map<String, Object> response = new HashMap<>();
		List<Message> message = friendService.findChat(chat_id);
		List<MessageResponseDto> messageResponseDto = message.stream().map(m -> new MessageResponseDto(m))
				.collect(Collectors.toList());
		response.put("data", messageResponseDto);
		response.put("message", "success");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "채팅입력")
	@MessageMapping(value = "/chat/message")
	public void message(MessageRequestDto requestDto) {
		// DB에 채팅내용 저장
		Message message = friendService.saveMessage(requestDto);
		MessageResponseDto responseDto = MessageResponseDto.builder().message(message).build();
		template.convertAndSend("/sub/chat/" + requestDto.getChat_id(), responseDto);
	}
}
