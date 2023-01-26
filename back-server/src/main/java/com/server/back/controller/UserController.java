package com.server.back.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.server.back.config.oauth.Provider.TokenDto;
import com.server.back.domain.user.User;
import com.server.back.dto.pocha.PochaParticipantResponseDto;
import com.server.back.jwt.service.JwtService;
import com.server.back.service.user.NaverService;
import com.server.back.service.user.UserService;
import com.server.back.jwt.TokenRequestDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.server.back.dto.user.*;


import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.PathVariable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {
    private final UserService userService;
    private final NaverService naverService;
    private final JwtService jwtService;

    @ApiOperation(value = "로그인", notes = "client_id, redirect_uri, response_type 전달.")
    @GetMapping("/api/oauth2/token/naver")
    public Map<String, String> NaverLogin(@RequestParam("code") String code) {
        TokenDto oauthToken = naverService.getAccessToken(code);
        User saveUser = naverService.saveUser(oauthToken.getAccess_token());
        TokenRequestDto tokenRequestDto = jwtService.joinJwtToken(saveUser.getUsername());
        return jwtService.successLoginResponse(tokenRequestDto);
    }
    @ApiOperation(value = "토큰 갱신", notes = "accessToken, refreshToken을 갱신하여 전달.")
    @GetMapping("/auth/refresh/{username}")
    public Map<String,String> refreshToken(@PathVariable("username") String username, @RequestHeader("refreshToken") String refreshToken,
                                           HttpServletResponse response) throws JsonProcessingException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        TokenRequestDto tokenRequestDto = jwtService.validRefreshToken(username, refreshToken);
        Map<String, String> jsonResponse = jwtService.recreateTokenResponse(tokenRequestDto);
        return jsonResponse;
    }
//    @PostMapping("/auth/refresh/{username}")
//    // TokenRequestDto, TokenDto 추가하면 [Map -> TokenDto]로 변경
//    public ResponseEntity<Map<String, Object>> userRefresh(@PathVariable (value = "username") String username/*, @RequestBody TokenRequestDto*/){
//        Map<String, Object> tokenDto = new HashMap<>();
//        tokenDto.put("accessToken", "accessToken 테스트!");
//        tokenDto.put("refreshToken", "refreshToken 테스트!");
//        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
//    }
    @ApiOperation(value = "닉네임 중복 체크", notes="닉네임 사용 가능하면 true")
    @GetMapping("/auth/check/nickname/{nickname}")
    public ResponseEntity<Map<String, Object>> userNicknameCheck(@PathVariable(value = "nickname") String nickname){
        Map<String, Object> response = new HashMap<>();
        Boolean nicknamecheck = userService.userNicknameCheck(nickname);
        response.put("data", nicknamecheck);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "로그아웃")
    @PutMapping("/auth/logout/{username}")
    public ResponseEntity<String> uesrLogout(@PathVariable(value = "username") String username){
        return new ResponseEntity<>("로그아웃 성공!", HttpStatus.OK);
    }
    @ApiOperation(value = "정보 수정")
    @PutMapping("/{username}")
    public ResponseEntity<Map<String, Object>> userUpdate(@PathVariable(value = "username") String username , @RequestBody UserRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        userService.userUpdate(username, requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "회원 탈퇴")
    @DeleteMapping("/{username}")
    public ResponseEntity<String> userDelete(@PathVariable(value = "username") String username){
        return new ResponseEntity<>("회원 탈퇴 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "내 정보 조회.")
    @GetMapping("/myinfo/{username}")
    // UserResponseDto 추가 후 [Map -> UserResponseDto]로 변경
    public ResponseEntity<Map<String, Object>> userMyInfo(@PathVariable(value = "username") String username){
        Map<String, Object> response = new HashMap<>();
        UserResponseDto responseDto = userService.userInfo(username);
        response.put("data", responseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "회원 정보 조회.")
    @GetMapping("/info/{username}")
    public ResponseEntity<Map<String, Object>> userInfo(@PathVariable(value = "username") String username){
        Map<String, Object> response = new HashMap<>();
        UserResponseDto responseDto = userService.userInfo(username);
        response.put("data", responseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포인트 사용 목록")
    @GetMapping("/point/{username}")
    // PointResponseDto 추가 후 [Map -> PointResponseDto]로 변경
    public ResponseEntity<Map<String, Object>> userPointList(@PathVariable(value = "username") String username){
        Map<String, Object> response = new HashMap<>();
        List<PochaParticipantResponseDto> responseDtoList = userService.userPointList(username);
        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포인트 획득, 사용")
    @PutMapping("/point/{username}")
    public ResponseEntity<String> userUsePoint(@PathVariable(value = "username") String username/*, @RequestBody PointRequestDto requestDto*/){
        return new ResponseEntity<>("포인트 사용 성공", HttpStatus.OK);
    }
    @ApiOperation(value = "평가 목록 요청")
    @GetMapping("/review/{username}")
    // ReviewResponseDto 추가 후 [Map -> ReviewResponseDto]로 변경
    public ResponseEntity<List<Map<String, Object>>> userReviewList(@PathVariable(value = "username") String username){
        List<Map<String, Object>> reviewResponseDto = new ArrayList<>();
        reviewResponseDto.add(new HashMap<>());
        reviewResponseDto.get(0).put("review_id", 700);
        reviewResponseDto.get(0).put("to_id", "평가 대상 회원 식별자");
        reviewResponseDto.get(0).put("nickname", "평가 대상 닉네임");
        reviewResponseDto.get(0).put("profile", "평가 대상 프로필");
        reviewResponseDto.get(0).put("review_score", 4);
        reviewResponseDto.get(0).put("create_at", LocalDateTime.now());
        reviewResponseDto.get(0).put("review_at", LocalDateTime.now().plusHours(2));
        
        return new ResponseEntity<>(reviewResponseDto, HttpStatus.OK);
    }
    @ApiOperation(value = "유저 평가")
    @PutMapping("/review")
    public ResponseEntity<String> userReview(/*@RequestBody ReviewRequestDto requestDto*/){
        return new ResponseEntity<>("유저 평가 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "보유 아이템 목록")
    @GetMapping("/item/{username}")
    // ItemResponseDto 추가 후 [Map -> ReviewResponseDto]로 변경
    public ResponseEntity<List<Map<String, Object>>> userItemList(@PathVariable(value = "username") String username){
        List<Map<String, Object>> itemResponseDto = new ArrayList<>();
        itemResponseDto.add(new HashMap<>());
        itemResponseDto.get(0).put("user_id", 700);
        itemResponseDto.get(0).put("item_id", 700);
        itemResponseDto.get(0).put("item_name", "아이템명");
        itemResponseDto.get(0).put("item_detail", "아이템 설명");
        itemResponseDto.get(0).put("item_type", 4);

        return new ResponseEntity<>(itemResponseDto, HttpStatus.OK);
    }
    @ApiOperation(value = "유저 신고")
    @PostMapping("/report")
    public ResponseEntity<String> userItemList(/*@RequestBody ReportRequestDto requestDto*/){
        return new ResponseEntity<>("신고 완료.", HttpStatus.OK);
    }
}
