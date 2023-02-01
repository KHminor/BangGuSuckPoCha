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
@ApiModel(value = "SsulReqeustDto", description = "썰 요청을 위한 데이터 타입")
public class SsulReqeustDto {
    private String username;
    private String ssulTitle;
}
