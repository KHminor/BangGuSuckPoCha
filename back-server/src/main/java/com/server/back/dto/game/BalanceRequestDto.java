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
@ApiModel(value = "BalanceRequestDto", description = "밸런스 게임 요청 데이터 타입")
public class BalanceRequestDto {
    Integer type;
    String question1;
    String question2;
}
