package com.server.back.dto.game;

import com.server.back.domain.game.Balance;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "BalanceResponseDto", description = "밸런스 게임 응답 데이터 타입")
public class BalanceResponseDto {
    Long balanceId;
    Integer type;
    String question1;
    String question2;

    public BalanceResponseDto(Balance e) {
        this.balanceId = e.getBalanceId();
        this.type = e.getType();
        this.question1 = e.getQuestion1();
        this.question2 = e.getQuestion2();
    }
}
