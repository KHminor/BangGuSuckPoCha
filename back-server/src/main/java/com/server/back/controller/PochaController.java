package com.server.back.controller;

import com.server.back.dto.pocha.*;
import com.server.back.dto.user.PointRequestDto;
import com.server.back.service.pocha.PochaService;
import com.server.back.service.user.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/pocha")
@RestController
public class PochaController {
    private final PochaService pochaService;
    private final UserService userService;

    @ApiOperation(value = "전체 포차 목록")
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> allPochaList(){
        Map<String, Object> response = new HashMap<>();

        List<PochaResponseDto> pochaResponseDto = pochaService.allPochaList();
        response.put("data", pochaResponseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 목록")
    @GetMapping
    public ResponseEntity<Map<String, Object>> pochaList(@RequestParam(value = "age") Integer age, @RequestParam(value = "region") String region, @RequestParam(value = "themeId", required = false) String themeId, @RequestParam(value = "tag", required = false) List<String> tagList){
        Map<String, Object> response = new HashMap<>();

        PochaRequestDto requestDto = PochaRequestDto.builder()
                .age(age)
                .region(region)
                .themeId(themeId)
                .tagList(tagList)
                .build();

        List<PochaResponseDto> pochaResponseDto = pochaService.pochaList(requestDto);
        response.put("data", pochaResponseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 설정 변경")
    @PutMapping("/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaUpdate(@PathVariable(value = "pocha_id") Long pochaId, @RequestBody PochaRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaUpdate(pochaId, requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 추가")
    @PostMapping
    public ResponseEntity<Map<String, Object>> pochaInsert(@RequestBody PochaRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        Long pochaId = pochaService.pochaInsert(requestDto);

        response.put("data", pochaId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 정보 요청")
    @GetMapping("/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaInfo(@PathVariable(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();

        PochaResponseDto responseDto = pochaService.pochaInfo(pochaId);

        response.put("data", responseDto);
        response.put("message", "success");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 종료(종료 시간 변경)")
    @PutMapping("/end/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaEnd(@PathVariable(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaEnd(pochaId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 참가 인원 목록")
    @GetMapping("/participant/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaParticipantList(@PathVariable(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        List<PochaParticipantResponseDto> responseDtoList = pochaService.pochaParticipantList(pochaId);
        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 시간 연장")
    @PutMapping("/extension/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaExtension(@PathVariable(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaExtension(pochaId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 입장")
    @PostMapping("/enter")
    public ResponseEntity<Map<String, Object>> pochaEnter(@RequestBody PochaParticipantRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaEnter(requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 나가기")
    @PutMapping("/exit")
    public ResponseEntity<Map<String, Object>> pochaExit(@RequestBody PochaParticipantRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaExit(requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "미팅 포차 시작")
    @PutMapping("/meeting/start/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaMeetingStart(@RequestBody @PathVariable(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        if(pochaService.pochaMeetingStart(pochaId)) response.put("message", "success");
        else response.put("message", "fail");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "주량 카운트")
    @PutMapping("/alcohol/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaAlcohol(@PathVariable(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaAlcohol(pochaId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 썰 변경")
    @PutMapping("/talk/ssul/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaSsul(@PathVariable(value = "pocha_id") Long pochaId, @RequestBody SsulReqeustDto reqeustDto){
        Map<String, Object> response = new HashMap<>();

        // 포인트 사용
        if(userService.usePoint(reqeustDto.getUsername(), PointRequestDto.builder()
                .amount(-500)
                .content("썰 변경-"+reqeustDto.getSsulTitle())
                .build()
        )) {
            pochaService.pochaSsul(pochaId, reqeustDto);
            response.put("message", "success");
        }else{
            response.put("message", "fail");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 초대 목록")
    @GetMapping("/invite/{username}")
    public ResponseEntity<Map<String, Object>> pochaInviteList(@PathVariable(value = "username") String username){
        Map<String, Object> response = new HashMap<>();
        List<InviteResponseDto> inviteResponseDto = pochaService.pochaInviteList(username);
        response.put("data", inviteResponseDto);
        response.put("message", "success");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차에 친구 초대")
    @PostMapping("/invite")
    public ResponseEntity<Map<String, Object>> pochaInvite(@RequestBody InviteRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(pochaService.pochaInvite(requestDto)) {
            response.put("message", "success");
        }else{
            response.put("message", "fail");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 초대 거절")
    @DeleteMapping("/invite/refuse/{invite_id}")
    public ResponseEntity<Map<String, Object>> pochaInviteRefuse(@PathVariable(value = "invite_id") Long inviteId){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaInviteRefuse(inviteId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 초대 수락")
    @PostMapping("/invite/accept/{invite_id}/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaInviteAccept(@PathVariable(value = "invite_id") Long inviteId, @PathVariable(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = pochaService.pochaInviteAccept(inviteId, pochaId);
        if(((String) result.get("message")).equals("success")){
            response.put("data", result.get("data"));
            response.put("message", result.get("message"));
        }else{
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
