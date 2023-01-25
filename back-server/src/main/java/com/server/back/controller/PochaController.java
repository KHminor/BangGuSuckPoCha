package com.server.back.controller;

import com.server.back.dto.pocha.*;
import com.server.back.service.pocha.PochaService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/pocha")
@RestController
public class PochaController {
    private final PochaService pochaService;

    @ApiOperation(value = "포차 목록")
    @GetMapping
    public ResponseEntity<Map<String, Object>> pochaList(@RequestParam PochaRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        List<PochaResponseDto> pochaResponseDto = pochaService.pochaList(requestDto);
        response.put("data", pochaResponseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 설정 변경")
    @PutMapping("/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaUpdate(@PathParam(value = "pocha_id") Long pochaId, @RequestBody PochaRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaUpdate(pochaId, requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 추가")
    @PostMapping
    public ResponseEntity<Map<String, Object>> pochaInsert(@RequestParam PochaRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        Long pochaId = pochaService.pochaInsert(requestDto);

        response.put("data", pochaId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 정보 요청")
    @GetMapping("/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaInfo(@PathParam(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();

        PochaResponseDto responseDto = pochaService.pochaInfo(pochaId);

        response.put("data", responseDto);
        response.put("message", "success");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 종료(종료 시간 변경)")
    @PutMapping("/end/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaEnd(@PathParam(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaEnd(pochaId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 참가 인원 목록")
    @GetMapping("/participant/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaParticipantList(@PathParam(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        List<PochaParticipantResponseDto> responseDtoList = pochaService.pochaParticipantList(pochaId);
        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 시간 연장")
    @PutMapping("/extension/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaExtension(@PathParam(value = "pocha_id") Long pochaId){
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
    @ApiOperation(value = "주량 카운트")
    @PutMapping("/alcohol/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaAlcohol(@PathParam(value = "pocha_id") Long pochaId){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaAlcohol(pochaId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 썰 변경")
    @PutMapping("/talk/ssul/{pocha_id}")
    public ResponseEntity<Map<String, Object>> pochaSsul(@PathParam(value = "pocha_id") Long pochaId, @RequestBody SsulReqeustDto reqeustDto){
        Map<String, Object> response = new HashMap<>();
        pochaService.pochaSsul(pochaId, reqeustDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
