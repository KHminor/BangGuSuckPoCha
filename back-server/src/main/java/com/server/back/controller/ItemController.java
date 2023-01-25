package com.server.back.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/item")
@RestController
public class ItemController {
    @GetMapping
    public ResponseEntity<List<Map<String,Object>>> itemList(){
        List<Map<String,Object>> itemResponseDtoList = new ArrayList<>();
        itemResponseDtoList.add(new HashMap<>());
        itemResponseDtoList.get(0).put("item_id", 700);
        itemResponseDtoList.get(0).put("item_name", "아이템명");
        itemResponseDtoList.get(0).put("item_detail", "아이템명");
        itemResponseDtoList.get(0).put("item_type", 0);
        return new ResponseEntity<>(itemResponseDtoList, HttpStatus.OK);
    }
}
