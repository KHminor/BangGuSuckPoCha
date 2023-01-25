package com.server.back.dto.game;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "LiarRequestDto", description = "라이어 게임 요청 데이터 타입")
public class LiarRequestDto {
    String type;
    String word;
}
