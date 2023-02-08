package com.server.back.dto.pocha;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "PochaParticipantRequestDto", description = "포차 참가 인원 요청을 위한 데이터 타입")
public class PochaParticipantRequestDto {
    private Long pochaId;
    private String username;
    private Boolean isHost;
}
