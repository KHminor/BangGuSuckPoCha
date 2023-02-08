package com.server.back.dto.pocha;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "InviteRequestDto", description = "포차 초대 요청을 위한 데이터 타입")
public class InviteRequestDto {
    @ApiModelProperty(value = "포차 번호")
    Long pochaId;
    @ApiModelProperty(value = "발신자")
    String fromUsername;
    @ApiModelProperty(value = "수신자")
    Long youId;
}
