package com.server.back.service.item;

import com.server.back.domain.item.Item;
import com.server.back.domain.item.ItemRepository;
import com.server.back.domain.user.*;
import com.server.back.dto.item.ItemResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Transactional
@Service
public class ItemServiceImpl implements ItemService {
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    @Override
    public List<ItemResponseDto> itemList(String username){
        Long userId = userRepository.findByUsername(username).getUserId();
        List<Item> item = itemRepository.findByUser_UserId(userId);
        List<ItemResponseDto> responseDtoList = item.stream()
                .map(i -> new ItemResponseDto(i))
                .collect(Collectors.toList());
        return responseDtoList;
    }
}
