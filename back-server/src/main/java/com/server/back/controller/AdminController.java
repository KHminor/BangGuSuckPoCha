package com.server.back.controller;

import com.server.back.dto.admin.SignupAdminRequestDto;
import com.server.back.dto.admin.RegionResponseDto;
import com.server.back.dto.admin.UpdateReportDto;
import com.server.back.dto.game.BalanceRequestDto;
import com.server.back.dto.game.LiarRequestDto;
import com.server.back.dto.game.YscRequestDto;
import com.server.back.dto.pocha.PochaParticipantResponseDto;
import com.server.back.dto.pocha.PochaResponseDto;
import com.server.back.dto.report.ReportResponseDto;
import com.server.back.dto.user.UserRequestDto;
import com.server.back.dto.user.UserResponseDto;
import com.server.back.jwt.service.JwtService;
import com.server.back.service.admin.AdminService;
import com.server.back.service.pocha.PochaService;
import com.server.back.service.report.ReportService;
import com.server.back.service.review.ReviewService;
import com.server.back.service.user.NaverService;
import com.server.back.service.user.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/admin")
@RestController
public class AdminController {
    private final UserService userService;
    private final NaverService naverService;
    private final ReviewService reviewService;
    private final ReportService reportService;
    private final JwtService jwtService;
    private final PochaService pochaService;
    private final AdminService adminService;

    // 로그인, 로그아웃
    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> join(@RequestPart(value = "requestDto") SignupAdminRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        System.out.println(requestDto);

        adminService.adminjoin(requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
//    @ApiOperation(value = "관리자 로그인")
//    @PostMapping("/auth/login")
//    public ResponseEntity<?> adminLogin(/*@RequestParam LoginAdminRequestDto requestDto*/){
//        Map<String, Object> tokenDto = new HashMap<>();
//        tokenDto.put("accessToken", "액세스 토큰");
//        tokenDto.put("refreshToken", "리프레시 토큰");
//        tokenDto.put("grantType", "인증 타입");
//        tokenDto.put("accessTokenExpireIn", "액세스 토큰 만료 시간");
//        tokenDto.put("username", "유저 아이디");
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Auth", (String) tokenDto.get("accessToken"));
//        headers.add("Refresh", (String) tokenDto.get("refreshToken"));
//
//        return new ResponseEntity<>(tokenDto, headers, HttpStatus.OK);
//    }

    // 유저 기능
    @ApiOperation(value = "전체 회원 목록")
    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> adminUserList(){
        Map<String, Object> response = new HashMap<>();
        List<UserResponseDto> userResponseDtoList = adminService.userInfoList();
        response.put("data", userResponseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "회원 목록 검색")
    @GetMapping("/user/{nickname}")
    public ResponseEntity<Map<String,Object>> adminUserSearch(@PathVariable(value = "nickname")String nickname){
        Map<String, Object> response = new HashMap<>();
        UserResponseDto userResponseDto = adminService.adminUserSearch(nickname);
        if (userResponseDto == null){
            response.put("data", "null");
        }else {
            response.put("data", userResponseDto);
        }
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "회원 수정")
    @PutMapping("/user/{nickname}")
    public ResponseEntity<Map<String, Object>> adminUserUpdate(@PathVariable(value = "nickname")String nickname, @RequestBody UserRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        adminService.adminUserUpdate(nickname, requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "회원 삭제")
    @DeleteMapping("/user/{nickname}")
    public ResponseEntity<Map<String, Object>> adminUserDelete(@PathVariable(value = "nickname")String nickname){
        Map<String, Object> response = new HashMap<>();
        adminService.userDelete(nickname);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "관리자 추가")
    @PostMapping("/user")
    public ResponseEntity<?> adminUserInsert(/*@RequestBody SingUpAdminRequestDto requestDto*/){
        return new ResponseEntity<>("관리자 추가 완료", HttpStatus.OK);
    }

    // 포차 기능
    @ApiOperation(value = "포차 목록")
    @GetMapping("/pocha")
    public ResponseEntity<Map<String, Object>> adminPochaList(){
        Map<String, Object> response = new HashMap<>();
        List<PochaResponseDto> userResponseDtoList = adminService.adminPochaList();
        response.put("data", userResponseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 참여 인원")
    @GetMapping("/pocha/{pocha_id}")
    public ResponseEntity<Map<String, Object>> adminPochaParticipant(@PathVariable(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        List<PochaParticipantResponseDto> responseDtoList = adminService.adminPochaParticipant(pochaId);
        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 삭제")
    @DeleteMapping("/pocha/{pocha_id}")
    public ResponseEntity<Map<String, Object>> adminPochaDelete(@PathVariable(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        adminService.adminPochaDelete(pochaId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    // 구매 기능
//    @ApiOperation(value = "구매 목록")
//    @GetMapping("/purchase/{nickname}")
//    public ResponseEntity<?> adminPurchaseList(@PathVariable(value = "nickname") String nickname){
//        List<Map<String, Object>> purchaseResponseDtoList = new ArrayList<>();
//        purchaseResponseDtoList.add(new HashMap<>());
//        purchaseResponseDtoList.get(0).put("pur_id", 700);
//        purchaseResponseDtoList.get(0).put("item_id", 700);
//        purchaseResponseDtoList.get(0).put("item_name", "아이템명");
//        purchaseResponseDtoList.get(0).put("item_type", 0);
//        purchaseResponseDtoList.get(0).put("item_price", 70000);
//        purchaseResponseDtoList.get(0).put("user_id", 700);
//        purchaseResponseDtoList.get(0).put("nickname", "닉네임");
//        purchaseResponseDtoList.get(0).put("create_at", LocalDateTime.now());
//        return new ResponseEntity<>(purchaseResponseDtoList, HttpStatus.OK);
//    }
//    @ApiOperation(value = "구매 삭제(환불)")
//    @DeleteMapping("/purchase/{pur_id}")
//    public ResponseEntity<?> adminPurchaseDelete(@PathVariable(value = "pur_id") Long purId){
//        return new ResponseEntity<>("환불 완료!", HttpStatus.OK);
//    }
//
//    // 아이템 기능
//    @ApiOperation(value = "전체 아이템 목록")
//    @GetMapping("/item")
//    public ResponseEntity<?> adminItemList(){
//        List<Map<String,Object>> itemResponseDtoList = new ArrayList<>();
//        itemResponseDtoList.add(new HashMap<>());
//        itemResponseDtoList.get(0).put("item_id", 700);
//        itemResponseDtoList.get(0).put("item_name", "아이템명");
//        itemResponseDtoList.get(0).put("item_detail", "아이템명");
//        itemResponseDtoList.get(0).put("item_type", 0);
//        return new ResponseEntity<>(itemResponseDtoList, HttpStatus.OK);
//    }
//    @ApiOperation(value = "아이템 수정")
//    @PutMapping("/item/{item_id}")
//    public ResponseEntity<?> adminItemUpdate(@PathVariable(value = "item_id")Long item_id/*, @RequestBody ItemRequestDto requestDto*/){
//        return new ResponseEntity<>("아이템 수정 완료", HttpStatus.OK);
//    }
//    @ApiOperation(value = "아이템 삭제")
//    @DeleteMapping("/item/{item_id}")
//    public ResponseEntity<?> adminItemDelete(@PathVariable(value = "item_id")Long item_id){
//        return new ResponseEntity<>("아이템 삭제 완료", HttpStatus.OK);
//    }
//    @ApiOperation(value = "아이템 추가")
//    @PostMapping("/item")
//    public ResponseEntity<?> adminItemInsert(/*@RequestBody ItemRequestDto requestDto*/){
//        return new ResponseEntity<>("아이템 추가 완료", HttpStatus.OK);
//    }

    // 게임 기능
    @ApiOperation(value = "양세찬 게임 데이터 수정")
    @PutMapping("/game/ysc/{ysc_id}")
    public ResponseEntity<Map<String, Object>> adminYscUpdate(@PathVariable(value = "ysc_id")Long ysc_id, @RequestBody YscRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        adminService.adminYscUpdate(ysc_id, requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "라이어 게임 데이터 수정")
    @PutMapping("/game/liar/{liar_id}")
    public ResponseEntity<?> adminLiarUpdate(@PathVariable(value = "liar_id")Long liar_id, @RequestBody LiarRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        adminService.adminLiarUpdate(liar_id, requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "밸런스 게임 데이터 수정")
    @PutMapping("/game/balance/{balance_id}")
    public ResponseEntity<?> adminBalanceUpdate(@PathVariable(value = "balance_id")Long balance_id, @RequestBody BalanceRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        adminService.adminBalanceUpdate(balance_id, requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "양세찬 게임 데이터 삭제")
    @DeleteMapping("/game/ysc/{ysc_id}")
    public ResponseEntity<Map<String, Object>> adminYscDelete(@PathVariable(value = "ysc_id")Long ysc_id){
        Map<String, Object> response = new HashMap<>();
        adminService.adminYscDelete(ysc_id);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "라이어 게임 데이터 삭제")
    @DeleteMapping("/game/liar/{liar_id}")
    public ResponseEntity<Map<String, Object>> adminLiarDelete(@PathVariable(value = "liar_id")Long liar_id){
        Map<String, Object> response = new HashMap<>();
        adminService.adminLiarDelete(liar_id);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "밸런스 게임 데이터 삭제")
    @DeleteMapping("/game/balance/{balance_id}")
    public ResponseEntity<Map<String, Object>> adminBalanceDelete(@PathVariable(value = "balance_id")Long balance_id){
        Map<String, Object> response = new HashMap<>();
        adminService.adminBalanceDelete(balance_id);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "양세찬 게임 데이터 추가")
    @PostMapping("/game/ysc")
    public ResponseEntity<Map<String,Object>> adminYscInsert(@RequestBody YscRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        adminService.adminYscInsert(requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "라이어 게임 데이터 추가")
    @PostMapping("/game/liar")
    public ResponseEntity<Map<String,Object>> adminLiarInsert(@RequestBody LiarRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        adminService.adminLiarInsert(requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "밸런스 게임 데이터 추가")
    @PostMapping("/game/balance")
    public ResponseEntity<Map<String,Object>> adminBalanceInsert(@RequestBody BalanceRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        adminService.adminBalanceInsert(requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 신고 기능
    @ApiOperation(value = "전체 신고 목록")
    @GetMapping("/report")
    public ResponseEntity<Map<String,Object>> adminReport(){
        Map<String, Object> response = new HashMap<>();
        List<ReportResponseDto> userResponseDtoList = adminService.adminReport();
        response.put("data", userResponseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "신고 처리")
    @PutMapping("/report/{report_id}")
    public ResponseEntity<Map<String,Object>> adminReportUpdate(@PathVariable(value = "report_id") Long report_id, @RequestBody UpdateReportDto requestDto){
        Map<String, Object> response = new HashMap<>();
        adminService.adminReportUpdate(report_id,requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "지역 데이터 목록")
    @GetMapping("/region")
    public ResponseEntity<Map<String, Object>> regionAll(){
        Map<String, Object> response = new HashMap<>();
        List<RegionResponseDto> responseDtoList = adminService.regionAll();
        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "닉네임 중복 체크", notes="닉네임 사용 가능하면 true")
    @GetMapping ("/check/{nickname}")
    public ResponseEntity<Map<String, Object>> adminNicknameCheck(String nickname){
        Map<String, Object> response = new HashMap<>();
        Boolean nicknamecheck = adminService.adminNicknameCheck(nickname);
        response.put("data", nicknamecheck);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
