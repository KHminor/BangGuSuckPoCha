package com.server.back.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.server.back.config.oauth.Provider.NaverToken;
import com.server.back.domain.user.User;
import com.server.back.jwt.service.JwtService;
import com.server.back.service.user.NaverService;
import com.server.back.jwt.JwtToken;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {
    private final NaverService naverService;
    private final JwtService jwtService;
    @ApiOperation(value = "로그인", notes = "client_id, redirect_uri, response_type 전달.")
    @GetMapping("/api/oauth2/token/naver")
    public Map<String, String> NaverLogin(@RequestParam("code") String code) {
        NaverToken oauthToken = naverService.getAccessToken(code);
        User saveUser = naverService.saveUser(oauthToken.getAccess_token());
        JwtToken jwtToken = jwtService.joinJwtToken(saveUser.getUsername());
        return jwtService.successLoginResponse(jwtToken);
    }
    @ApiOperation(value = "토큰 갱신", notes = "accessToken, refreshToken을 갱신하여 전달.")
    @GetMapping("/auth/refresh/{username}")
    public Map<String,String> refreshToken(@PathVariable("username") String username, @RequestHeader("refreshToken") String refreshToken,
                                           HttpServletResponse response) throws JsonProcessingException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        JwtToken jwtToken = jwtService.validRefreshToken(username, refreshToken);
        Map<String, String> jsonResponse = jwtService.recreateTokenResponse(jwtToken);
        return jsonResponse;
    }
//    @PostMapping("/auth/refresh/{username}")
//    // TokenRequestDto, TokenDto 추가하면 [Map -> TokenDto]로 변경
//    public ResponseEntity<Map<String, Object>> userRefresh(@PathParam (value = "username") String username/*, @RequestBody TokenRequestDto*/){
//        Map<String, Object> tokenDto = new HashMap<>();
//        tokenDto.put("accessToken", "accessToken 테스트!");
//        tokenDto.put("refreshToken", "refreshToken 테스트!");
//        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
//    }
    @ApiOperation(value = "닉네임 중복 체크")
    @GetMapping("/auth/check/nickname/{nickname}")
    public ResponseEntity<Boolean> userNicknameCheck(@PathParam(value = "nickname") String nickname){
        return new ResponseEntity<>(false, HttpStatus.OK);
    }
    @ApiOperation(value = "로그아웃")
    @PutMapping("/auth/logout/{username}")
    public ResponseEntity<String> uesrLogout(@PathParam(value = "username") String username){
        return new ResponseEntity<>("로그아웃 성공!", HttpStatus.OK);
    }
    @ApiOperation(value = "정보 수정")
    @PutMapping("/{username}")
    // UserRequestDto 추가 후 주석 해제.
    public ResponseEntity<String> userUpdate(@PathParam(value = "username") String username /*, @RequestBody UserRequestDto requestDto*/){
        return new ResponseEntity<>("정보 수정 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "회원 탈퇴")
    @DeleteMapping("/{username}")
    public ResponseEntity<String> userDelete(@PathParam(value = "username") String username){
        return new ResponseEntity<>("회원 탈퇴 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "내 정보 조회.")
    @GetMapping("/myinfo/{username}")
    // UserResponseDto 추가 후 [Map -> UserResponseDto]로 변경
    public ResponseEntity<Map<String, Object>> userMyInfo(@PathParam(value = "username") String username){
        Map<String, Object> userResponseDto = new HashMap<>();
        userResponseDto.put("username", "유저명");
        userResponseDto.put("nickname", "닉네임");
        userResponseDto.put("gender", "성별");
        userResponseDto.put("birth", "생일");
        userResponseDto.put("region", "지역");
        userResponseDto.put("profile", "프로필");
        userResponseDto.put("manner", 700);
        userResponseDto.put("comment", "자기소개");
        userResponseDto.put("point", 700);

        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 정보 조회.")
    @GetMapping("/info/{username}")
    // UserResponseDto 추가 후 [Map -> UserResponseDto]로 변경
    public ResponseEntity<Map<String, Object>> userInfo(@PathParam(value = "username") String username){
        Map<String, Object> userResponseDto = new HashMap<>();
        userResponseDto.put("username", "유저명");
        userResponseDto.put("nickname", "닉네임");
        userResponseDto.put("gender", "성별");
        userResponseDto.put("birth", "생일");
        userResponseDto.put("region", "지역");
        userResponseDto.put("profile", "프로필");
        userResponseDto.put("manner", 700);
        userResponseDto.put("comment", "자기소개");
        userResponseDto.put("point", 0);

        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "포인트 사용 목록")
    @GetMapping("/point/{username}")
    // PointResponseDto 추가 후 [Map -> PointResponseDto]로 변경
    public ResponseEntity<List<Map<String, Object>>> userPointList(@PathParam(value = "username") String username){
        List<Map<String, Object>> pointResponseDto = new ArrayList<>();
        pointResponseDto.add(new HashMap<>());
        pointResponseDto.get(0).put("point_id", "포인트 식별자");
        pointResponseDto.get(0).put("user_id", "회원 식별자");
        pointResponseDto.get(0).put("nickname", "닉네임");
        pointResponseDto.get(0).put("content", "사용 내역");
        pointResponseDto.get(0).put("amount", 700);
        pointResponseDto.get(0).put("current_point", 7000);
        pointResponseDto.get(0).put("create_at", "프로필");

        return new ResponseEntity<>(pointResponseDto, HttpStatus.OK);
    }
    @ApiOperation(value = "포인트 획득, 사용")
    @PutMapping("/point/{username}")
    public ResponseEntity<String> userUsePoint(@PathParam(value = "username") String username/*, @RequestBody PointRequestDto requestDto*/){
        return new ResponseEntity<>("포인트 사용 성공", HttpStatus.OK);
    }
    @ApiOperation(value = "평가 목록 요청")
    @GetMapping("/review/{username}")
    // ReviewResponseDto 추가 후 [Map -> ReviewResponseDto]로 변경
    public ResponseEntity<List<Map<String, Object>>> userReviewList(@PathParam(value = "username") String username){
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
    public ResponseEntity<List<Map<String, Object>>> userItemList(@PathParam(value = "username") String username){
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
