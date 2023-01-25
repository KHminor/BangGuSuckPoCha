package com.server.back.dto.game;

import com.server.back.domain.game.Ysc;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "YscResponseDto", description = "양세찬 게임 요청 데이터 타입")
public class YscResponseDto {
    Long yscId;
    String type;
    String word;

    public YscResponseDto(Ysc e) {
        this.yscId = e.getYscId();
        this.type = e.getType();
        this.word = e.getWord();
    }
}
