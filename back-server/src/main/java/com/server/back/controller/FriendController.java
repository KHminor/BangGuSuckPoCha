package com.server.back.controller;


import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/user/friend")
@RestController
public class FriendController {
    @ApiOperation(value = "친구 목록")
    @GetMapping("/{username}")
    // FriendResponseDto 추가하면 [Map -> FriendResponseDto]로 변경
    public ResponseEntity<List<Map<String, Object>>> friendList(@PathParam(value = "username") String username){
        List<Map<String, Object>> friendResponseDto = new ArrayList<>();
        friendResponseDto.add(new HashMap<>());
        friendResponseDto.get(0).put("friend_id", 700);
        friendResponseDto.get(0).put("you_id", 700);
        friendResponseDto.get(0).put("f_nickname", "친구 닉네임");
        friendResponseDto.get(0).put("best_friend", 0);
        friendResponseDto.get(0).put("chat_id", 700);
        return new ResponseEntity<>(friendResponseDto, HttpStatus.OK);
    }
    @ApiOperation(value = "친구 목록 검색")
    @GetMapping("/{username}/{f_nickname}")
    // FriendResponseDto 추가하면 [Map -> FriendResponseDto]로 변경
    public ResponseEntity<List<Map<String, Object>>> friendSearchList(@PathParam(value = "username") String username, @PathParam(value = "f_nickname") String fNickname){
        List<Map<String, Object>> friendResponseDto = new ArrayList<>();
        friendResponseDto.add(new HashMap<>());
        friendResponseDto.get(0).put("friend_id", 700);
        friendResponseDto.get(0).put("you_id", 700);
        friendResponseDto.get(0).put("f_nickname", "친구 검색 닉네임");
        friendResponseDto.get(0).put("best_friend", 0);
        friendResponseDto.get(0).put("chat_id", 700);
        return new ResponseEntity<>(friendResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "친구 삭제")
    @DeleteMapping("/{username}/{you_id}")
    public ResponseEntity<String> friendDelete(@PathParam(value = "username") String username, @PathParam(value = "you_id") String youId){
        return new ResponseEntity<>("삭제 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "친한 친구 설정")
    @PutMapping("/{username}/{you_id}")
    public ResponseEntity<String> friendUpdate(@PathParam(value = "username") String username, @PathParam(value = "you_id") String youId){
        return new ResponseEntity<>("설정 변경 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "친구 요청 목록")
    @GetMapping("/request/{username}")
    // FRequestResponseDto 추가 후 [Map -> FRequestResponseDto]로 변경
    public ResponseEntity<List<Map<String, Object>>> friendRequestList(@PathParam(value = "username") String username){
        List<Map<String, Object>> fRequestResponseDto = new ArrayList<>();
        fRequestResponseDto.add(new HashMap<>());
        fRequestResponseDto.get(0).put("f_friend_id", 700);
        fRequestResponseDto.get(0).put("to_id", 700);
        fRequestResponseDto.get(0).put("to_nickname", "발신자 닉네임");
        fRequestResponseDto.get(0).put("to_profile", "발신자 프로필");
        return new ResponseEntity<>(fRequestResponseDto, HttpStatus.OK);
    }
    @ApiOperation(value = "친구 요청")
    @PostMapping("/request")
    // FRequestResponseDto 추가 후 [Map -> FRequestResponseDto]로 변경
    public ResponseEntity<String> friendRequest(/*@RequestBody FRequestDto requestDto*/){
        return new ResponseEntity<>("친구 요청 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "친구 요청 삭제")
    @DeleteMapping("/request/{f_request_id}")
    public ResponseEntity<String> friendRequestDelete(@PathParam(value = "f_request_id") String fRequestId){
        return new ResponseEntity<>("친구 요청 삭제", HttpStatus.OK);
    }
    @ApiOperation(value = "친구 요청 수락")
    @PostMapping("/request/{f_request_id}")
    public ResponseEntity<String> friendRequestAccept(@PathParam(value = "f_request_id") String fRequestId){
        return new ResponseEntity<>("친구 요청 수락", HttpStatus.OK);
    }
    @ApiOperation(value = "채팅 전송")
    @PostMapping("/request/chat")
    public ResponseEntity<String> friendChat(/*@RequestBody MessageRequestDto requestDto*/){
        return new ResponseEntity<>("채팅 전송 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "채팅 전송")
    @GetMapping("/request/chat/{chat_id}")
    // MessageResponseDto 추가후 [Map -> MessageResponseDto]로 변경
    public ResponseEntity<List<Map<String, Object>>> friendChatList(@PathParam(value = "chat_id") String chatId){
        List<Map<String, Object>> messageResponseDto = new ArrayList<>();
        messageResponseDto.add(new HashMap<>());
        messageResponseDto.get(0).put("message_id", 700);
        messageResponseDto.get(0).put("user_id", 700);
        messageResponseDto.get(0).put("user_nickname", "닉네임");
        messageResponseDto.get(0).put("content", "채팅 내용");
        messageResponseDto.get(0).put("create_at", LocalDateTime.now());
        return new ResponseEntity<>(messageResponseDto, HttpStatus.OK);
    }
}
