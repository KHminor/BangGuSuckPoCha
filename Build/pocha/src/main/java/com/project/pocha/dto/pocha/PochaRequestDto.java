package com.project.pocha.dto.pocha;

import com.project.pocha.domain.pocha.Tag;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "PochaRequestDto", description = "포차 요청을 위한 데이터 타입")
public class PochaRequestDto {
    private Long themeId;
    private Long age;
    private String region;
    private Set<Tag> tagSet;
    private Integer isPrivate;
}
