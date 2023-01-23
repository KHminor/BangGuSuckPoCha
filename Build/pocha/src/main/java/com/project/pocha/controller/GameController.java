package com.project.pocha.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/pocha/game")
@RestController
public class GameController {
    @ApiOperation(value = "양세찬 게임 데이터")
    @GetMapping("/ysc")
    public ResponseEntity<?> gameYsc(){
        List<Map<String, Object>> responseDtoList = new ArrayList<>();
        responseDtoList.add(new HashMap<>());
        responseDtoList.get(0).put("ysc_id", 700);
        responseDtoList.get(0).put("type", "종류");
        responseDtoList.get(0).put("word", "단어");
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "라이어 게임 데이터")
    @GetMapping("/liar")
    public ResponseEntity<?> gameLiar(){
        List<Map<String, Object>> responseDtoList = new ArrayList<>();
        responseDtoList.add(new HashMap<>());
        responseDtoList.get(0).put("liar_id", 700);
        responseDtoList.get(0).put("type", "종류");
        responseDtoList.get(0).put("word", "단어");
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "밸런스 게임 데이터")
    @GetMapping("/ysc/{type}")
    public ResponseEntity<?> gameBalance(@PathParam(value = "type") Long type){
        List<Map<String, Object>> responseDtoList = new ArrayList<>();
        responseDtoList.add(new HashMap<>());
        responseDtoList.get(0).put("balance_id", 700);
        responseDtoList.get(0).put("type", type);
        responseDtoList.get(0).put("question1", "질문1");
        responseDtoList.get(0).put("question2", "질문2");
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }
}
