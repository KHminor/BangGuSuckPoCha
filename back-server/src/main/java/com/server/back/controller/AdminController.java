package com.server.back.controller;

import com.server.back.dto.pocha.PochaParticipantResponseDto;
import com.server.back.dto.pocha.PochaRequestDto;
import com.server.back.dto.pocha.PochaResponseDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
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
@RequestMapping("/admin")
@RestController
public class AdminController {
    // 로그인, 로그아웃
    @ApiOperation(value = "관리자 로그인")
    @PostMapping("/auth/login")
    public ResponseEntity<?> adminLogin(/*@RequestParam LoginAdminRequestDto requestDto*/){
        Map<String, Object> tokenDto = new HashMap<>();
        tokenDto.put("accessToken", "액세스 토큰");
        tokenDto.put("refreshToken", "리프레시 토큰");
        tokenDto.put("grantType", "인증 타입");
        tokenDto.put("accessTokenExpireIn", "액세스 토큰 만료 시간");
        tokenDto.put("username", "유저 아이디");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Auth", (String) tokenDto.get("accessToken"));
        headers.add("Refresh", (String) tokenDto.get("refreshToken"));

        return new ResponseEntity<>(tokenDto, headers, HttpStatus.OK);
    }

    // 유저 기능
    @ApiOperation(value = "전체 회원 목록")
    @GetMapping("/user")
    public ResponseEntity<?> adminUserList(){
        List<Map<String,Object>> userResponseDtoList = new ArrayList<>();
        userResponseDtoList.add(new HashMap<>());
        userResponseDtoList.get(0).put("username", "유저명");
        userResponseDtoList.get(0).put("nickname", "닉네임");
        userResponseDtoList.get(0).put("gender", "성별");
        userResponseDtoList.get(0).put("birth", "생일");
        userResponseDtoList.get(0).put("region", "지역");
        userResponseDtoList.get(0).put("profile", "프로필");
        userResponseDtoList.get(0).put("manner", 700);
        userResponseDtoList.get(0).put("comment", "자기소개");
        userResponseDtoList.get(0).put("point", 0);
        return new ResponseEntity<>(userResponseDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "회원 목록 검색")
    @GetMapping("/user/{nickname}")
    public ResponseEntity<?> adminUserSearch(@PathParam(value = "nickname")String nickname){
        List<Map<String,Object>> userResponseDtoList = new ArrayList<>();
        userResponseDtoList.add(new HashMap<>());
        userResponseDtoList.get(0).put("username", "유저명");
        userResponseDtoList.get(0).put("nickname", "닉네임");
        userResponseDtoList.get(0).put("gender", "성별");
        userResponseDtoList.get(0).put("birth", "생일");
        userResponseDtoList.get(0).put("region", "지역");
        userResponseDtoList.get(0).put("profile", "프로필");
        userResponseDtoList.get(0).put("manner", 700);
        userResponseDtoList.get(0).put("comment", "자기소개");
        userResponseDtoList.get(0).put("point", 0);
        return new ResponseEntity<>(userResponseDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "회원 수정")
    @PutMapping("/user/{nickname}")
    public ResponseEntity<?> adminUserUpdate(@PathParam(value = "nickname")String nickname/*, @RequestBody UserRequestDto requestDto*/){
        return new ResponseEntity<>("회원 수정 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "회원 삭제")
    @DeleteMapping("/user/{nickname}")
    public ResponseEntity<?> adminUserDelete(@PathParam(value = "nickname")String nickname){
        return new ResponseEntity<>("회원 삭제 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "관리자 추가")
    @PostMapping("/user")
    public ResponseEntity<?> adminUserInsert(/*@RequestBody SingUpAdminRequestDto requestDto*/){
        return new ResponseEntity<>("관리자 추가 완료", HttpStatus.OK);
    }

    // 포차 기능
    @ApiOperation(value = "포차 목록")
    @GetMapping("/pocha")
    public ResponseEntity<?> adminPochaList(@RequestParam PochaRequestDto requestDto){
        List<PochaResponseDto> responseDtoList = new ArrayList<>();
        responseDtoList.add(PochaResponseDto.builder()
                .pochaId(700L)
                .age(20)
                .limitUser(6)
                .isPrivate(false)
                .alcohol(0)
                .isSsul(false)
                .ssulTitle(null)
                .themeId("T0N0")
                .region("부산")
                .tagList(null)
                .totalCount(14)
                .maleCount(7)
                .femaleCount(7)
                .isEnd(false)
                .createAt(LocalDateTime.now())
                .endAt(LocalDateTime.now().plusHours(2))
                .build());
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 참여 인원")
    @GetMapping("/pocha/{pocha_id}")
    public ResponseEntity<?> adminPochaParticipant(@PathParam(value = "pocha_id") Long pochaId){
        List<PochaParticipantResponseDto> responseDtoList = new ArrayList<>();
        responseDtoList.add(PochaParticipantResponseDto.builder()
                .pochaId(700L)
                .username("아이디")
                .nickname("닉네임")
                .waiting(false)
                .isHost(false)
                .createAt(LocalDateTime.now())
                .exitAt(LocalDateTime.now().plusHours(2))
                .build());
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 삭제")
    @DeleteMapping("/pocha/{pocha_id}")
    public ResponseEntity<?> adminPochaDelete(@PathParam(value = "pocha_id") Long pochaId){
        return new ResponseEntity<>("포차 삭제 완료", HttpStatus.OK);
    }

    // 구매 기능
    @ApiOperation(value = "구매 목록")
    @GetMapping("/purchase/{nickname}")
    public ResponseEntity<?> adminPurchaseList(@PathParam(value = "nickname") String nickname){
        List<Map<String, Object>> purchaseResponseDtoList = new ArrayList<>();
        purchaseResponseDtoList.add(new HashMap<>());
        purchaseResponseDtoList.get(0).put("pur_id", 700);
        purchaseResponseDtoList.get(0).put("item_id", 700);
        purchaseResponseDtoList.get(0).put("item_name", "아이템명");
        purchaseResponseDtoList.get(0).put("item_type", 0);
        purchaseResponseDtoList.get(0).put("item_price", 70000);
        purchaseResponseDtoList.get(0).put("user_id", 700);
        purchaseResponseDtoList.get(0).put("nickname", "닉네임");
        purchaseResponseDtoList.get(0).put("create_at", LocalDateTime.now());
        return new ResponseEntity<>(purchaseResponseDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "구매 삭제(환불)")
    @DeleteMapping("/purchase/{pur_id}")
    public ResponseEntity<?> adminPurchaseDelete(@PathParam(value = "pur_id") Long purId){
        return new ResponseEntity<>("환불 완료!", HttpStatus.OK);
    }

    // 아이템 기능
    @ApiOperation(value = "전체 아이템 목록")
    @GetMapping("/item")
    public ResponseEntity<?> adminItemList(){
        List<Map<String,Object>> itemResponseDtoList = new ArrayList<>();
        itemResponseDtoList.add(new HashMap<>());
        itemResponseDtoList.get(0).put("item_id", 700);
        itemResponseDtoList.get(0).put("item_name", "아이템명");
        itemResponseDtoList.get(0).put("item_detail", "아이템명");
        itemResponseDtoList.get(0).put("item_type", 0);
        return new ResponseEntity<>(itemResponseDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "아이템 수정")
    @PutMapping("/item/{item_id}")
    public ResponseEntity<?> adminItemUpdate(@PathParam(value = "item_id")Long item_id/*, @RequestBody ItemRequestDto requestDto*/){
        return new ResponseEntity<>("아이템 수정 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "아이템 삭제")
    @DeleteMapping("/item/{item_id}")
    public ResponseEntity<?> adminItemDelete(@PathParam(value = "item_id")Long item_id){
        return new ResponseEntity<>("아이템 삭제 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "아이템 추가")
    @PostMapping("/item")
    public ResponseEntity<?> adminItemInsert(/*@RequestBody ItemRequestDto requestDto*/){
        return new ResponseEntity<>("아이템 추가 완료", HttpStatus.OK);
    }

    // 게임 기능
    @ApiOperation(value = "양세찬 게임 데이터 수정")
    @PutMapping("/game/ysc/{ysc_id}")
    public ResponseEntity<?> adminYscUpdate(@PathParam(value = "ysc_id")Long ysc_id/*, @RequestBody YscRequestDto requestDto*/){
        return new ResponseEntity<>("양세찬 게임 데이터 수정 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "라이어 게임 데이터 수정")
    @PutMapping("/game/liar/{liar_id}")
    public ResponseEntity<?> adminLiarUpdate(@PathParam(value = "liar_id")Long liar_id/*, @RequestBody LiarRequestDto requestDto*/){
        return new ResponseEntity<>("라이어 게임 데이터 수정 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "밸런스 게임 데이터 수정")
    @PutMapping("/game/balance/{balance_id}")
    public ResponseEntity<?> adminBalanceUpdate(@PathParam(value = "balance_id")Long balance_id/*, @RequestBody BalanceRequestDto requestDto*/){
        return new ResponseEntity<>("밸런스 게임 데이터 수정 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "양세찬 게임 데이터 삭제")
    @DeleteMapping("/game/ysc/{ysc_id}")
    public ResponseEntity<?> adminYscDelte(@PathParam(value = "ysc_id")Long ysc_id){
        return new ResponseEntity<>("양세찬 게임 데이터 삭제 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "라이어 게임 데이터 삭제")
    @DeleteMapping("/game/liar/{liar_id}")
    public ResponseEntity<?> adminLiarDelte(@PathParam(value = "liar_id")Long liar_id){
        return new ResponseEntity<>("라이어 게임 데이터 삭제 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "밸런스 게임 데이터 삭제")
    @DeleteMapping("/game/balance/{balance_id}")
    public ResponseEntity<?> adminBalanceDelte(@PathParam(value = "balance_id")Long balance_id){
        return new ResponseEntity<>("밸런스 게임 데이터 삭제 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "양세찬 게임 데이터 추가")
    @PostMapping("/game/ysc")
    public ResponseEntity<?> adminYscInsert(/*, @RequestBody YscRequestDto requestDto*/){
        return new ResponseEntity<>("양세찬 게임 데이터 추가 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "라이어 게임 데이터 추가")
    @PostMapping("/game/liar")
    public ResponseEntity<?> adminLiarInsert(/*, @RequestBody LiarRequestDto requestDto*/){
        return new ResponseEntity<>("라이어 게임 데이터 추가 완료", HttpStatus.OK);
    }
    @ApiOperation(value = "밸런스 게임 데이터 추가")
    @PostMapping("/game/balance")
    public ResponseEntity<?> adminBalanceInsert(/*, @RequestBody BalanceRequestDto requestDto*/){
        return new ResponseEntity<>("밸런스 게임 데이터 추가 완료", HttpStatus.OK);
    }

    // 신고 기능
    @ApiOperation(value = "전체 신고 목록")
    @GetMapping("/report")
    public ResponseEntity<?> adminReport(){
        List<Map<String,Object>> reportResponsetDto = new ArrayList<>();
        reportResponsetDto.add(new HashMap<>());
        reportResponsetDto.get(0).put("report_id", 700);
        reportResponsetDto.get(0).put("reporter_id", 999);
        reportResponsetDto.get(0).put("attacker_id", 0);
        reportResponsetDto.get(0).put("report_type", 0);
        reportResponsetDto.get(0).put("report_reason", "신고 내역");
        reportResponsetDto.get(0).put("report_at", LocalDateTime.now());
        return new ResponseEntity<>(reportResponsetDto, HttpStatus.OK);
    }
    @ApiOperation(value = "신고 처리")
    @PutMapping("/report/{report_id}")
    public ResponseEntity<?> adminReportUpdate(@PathParam(value = "report_id") Long report_id/*, @RequestBody ReportRequestDto requestDto*/){
        return new ResponseEntity<>("신고 처리 완료", HttpStatus.OK);
    }

}
