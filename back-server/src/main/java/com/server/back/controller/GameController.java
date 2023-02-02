package com.server.back.controller;

import com.server.back.dto.game.BalanceResponseDto;
import com.server.back.dto.game.LiarResponseDto;
import com.server.back.dto.game.YscResponseDto;
import com.server.back.service.game.GameService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/pocha/game")
@RestController
public class GameController {
    private final GameService gameService;

    @ApiOperation(value = "양세찬 게임 데이터")
    @GetMapping("/ysc")
    public ResponseEntity<Map<String,Object>> gameYsc(){
        Map<String, Object> response = new HashMap<>();

        List<YscResponseDto> responseDtoList = gameService.gameYsc();

        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "라이어 게임 데이터")
    @GetMapping("/liar")
    public ResponseEntity<Map<String,Object>> gameLiar(){
        Map<String,Object> response = new HashMap<>();

        List<LiarResponseDto> responseDtoList = gameService.gameLiar();

        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "밸런스 게임 데이터")
    @GetMapping("/balance/{type}")
    public ResponseEntity<Map<String,Object>> gameBalance(@PathVariable(value = "type") Integer type){
        Map<String,Object> response = new HashMap<>();

        List<BalanceResponseDto> responseDtoList = gameService.gameBalance(type);

        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
