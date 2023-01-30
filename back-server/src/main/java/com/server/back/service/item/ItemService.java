package com.server.back.service.item;

import com.server.back.dto.item.ItemResponseDto;
import com.server.back.dto.user.PointRequestDto;
import com.server.back.dto.user.PointResponseDto;
import com.server.back.dto.user.UserRequestDto;
import com.server.back.dto.user.UserResponseDto;

import java.util.List;


public interface ItemService {
    List<ItemResponseDto> itemList(String username);
}
