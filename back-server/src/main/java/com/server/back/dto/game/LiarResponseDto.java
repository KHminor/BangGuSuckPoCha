package com.server.back.dto.game;

import com.server.back.domain.game.Liar;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "LiarResponseDto", description = "라이어 게임 요청 데이터 타입")
public class LiarResponseDto {
    Long liarId;
    String type;
    String word;

    public LiarResponseDto(Liar e) {
        this.liarId = e.getLiarId();
        this.type = e.getType();
        this.word = e.getWord();
    }
}
