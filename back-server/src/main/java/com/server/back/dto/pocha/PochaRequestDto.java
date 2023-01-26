package com.server.back.dto.pocha;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "PochaRequestDto", description = "포차 요청을 위한 데이터 타입")
public class PochaRequestDto {
    private String themeId;
    private Integer age;
    private String region;
    private List<String> tagList;
    private Boolean isPrivate;
    private Integer limitUser;
}
