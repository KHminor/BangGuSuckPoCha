package com.project.pocha.controller;

import com.project.pocha.dto.pocha.*;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/pocha")
@RestController
public class PochaController {
    @ApiOperation(value = "포차 목록")
    @GetMapping
    public ResponseEntity<List<PochaResponseDto>> pochaList(@RequestParam PochaRequestDto requestDto){
        List<PochaResponseDto> pochaResponseDto = new ArrayList<>();
        pochaResponseDto.add(PochaResponseDto.builder()
                .pochaId(700L)
                .age(20)
                .limitUser(6)
                .isPrivate(0)
                .drink(0)
                .isSsul(0)
                .ssulTitle(null)
                .themeId("T0N0")
                .region("부산")
                .tagList(null)
                .totalCount(14)
                .maleCount(7)
                .femaleCount(7)
                .isEnd(0)
                .createAt(LocalDateTime.now())
                .endAt(LocalDateTime.now().plusHours(2))
                .build());
        return new ResponseEntity<>(pochaResponseDto, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 설정 변경")
    @PutMapping
    public ResponseEntity<String> pochaUpdate(@RequestBody PochaRequestDto requestDto){
        return new ResponseEntity<>("포차 설정 변경", HttpStatus.OK);
    }
    @ApiOperation(value = "포차 추가")
    @PostMapping
    public ResponseEntity<String> pochaInsert(@RequestParam PochaRequestDto requestDto){
        return new ResponseEntity<>("포차 추가", HttpStatus.OK);
    }
    @ApiOperation(value = "포차 정보 요청")
    @GetMapping("/{pocha_id}")
    public ResponseEntity<PochaResponseDto> pochaInfo(@PathParam(value = "pocha_id") Long pochaId){
        PochaResponseDto responseDto = PochaResponseDto.builder()
                .pochaId(700L)
                .age(20)
                .limitUser(6)
                .isPrivate(0)
                .drink(0)
                .isSsul(0)
                .ssulTitle(null)
                .themeId("T0N0")
                .region("부산")
                .tagList(null)
                .totalCount(14)
                .maleCount(7)
                .femaleCount(7)
                .isEnd(0)
                .createAt(LocalDateTime.now())
                .endAt(LocalDateTime.now().plusHours(2))
                .build();
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 종료(종료 시간 변경)")
    @PutMapping("/{pocha_id}")
    public ResponseEntity<String> pochaEnd(@PathParam(value = "pocha_id") Long pochaId){
        return new ResponseEntity<>("포차 종료", HttpStatus.OK);
    }
    @ApiOperation(value = "포차 참가 인원 목록")
    @GetMapping("/participant/{pocha_id}")
    public ResponseEntity<?> pochaParticipantList(@PathParam(value = "pocha_id") Long pochaId){
        List<PochaParticipantResponseDto> responseDtoList = new ArrayList<>();
        responseDtoList.add(PochaParticipantResponseDto.builder()
                .pochaId(700L)
                .userId(700L)
                .nickname("닉네임")
                .waiting(0)
                .isHost(0)
                .createAt(LocalDateTime.now())
                .exitAt(LocalDateTime.now().plusHours(2))
                .build());
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "포차 시간 연장")
    @PutMapping("/extension/{pocha_id}")
    public ResponseEntity<?> pochaExtension(@PathParam(value = "pocha_id") Long pochaId){
        return new ResponseEntity<>("포차 시간 연장", HttpStatus.OK);
    }
    @ApiOperation(value = "포차 입장")
    @PostMapping("/enter")
    public ResponseEntity<?> pochaEnter(@RequestBody PochaParticipantRequestDto requestDto){
        return new ResponseEntity<>("포차 입장", HttpStatus.OK);
    }
    @ApiOperation(value = "포차 나가기")
    @PutMapping("/exit/{username}")
    public ResponseEntity<?> pochaExit(@PathParam(value = "username") String username, @RequestBody PochaParticipantRequestDto requestDto){
        return new ResponseEntity<>("포차 나가기", HttpStatus.OK);
    }
    @ApiOperation(value = "주량 카운트")
    @PutMapping("/drink/{pocha_id}")
    public ResponseEntity<?> pochaDrink(@PathParam(value = "pocha_id") Long pochaId){
        return new ResponseEntity<>("포차 주량 카운트", HttpStatus.OK);
    }
    @ApiOperation(value = "포차 썰 변경")
    @PutMapping("/talk/ssul/{pocha_id}")
    public ResponseEntity<?> pochaSsul(@PathParam(value = "pocha_id") Long pochaId, @RequestBody SsulReqeustDto reqeustDto){
        return new ResponseEntity<>("포차 썰 변경", HttpStatus.OK);
    }
}
