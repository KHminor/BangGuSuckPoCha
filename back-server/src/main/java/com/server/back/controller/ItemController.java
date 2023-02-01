package com.server.back.controller;

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
@RequestMapping("/item")
@RestController
public class ItemController {
//    private final ItemService itemService;

    @ApiOperation(value = "보유 아이템 목록")
    @GetMapping
    public ResponseEntity<Map<String, Object>> itemList(@PathVariable(value = "username") String username){
        Map<String, Object> response = new HashMap<>();
//        List<ItemResponseDto> responseDtoList = itemService.itemList(username);
//        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
