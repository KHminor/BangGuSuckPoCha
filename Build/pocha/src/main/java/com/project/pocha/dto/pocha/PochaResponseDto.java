package com.project.pocha.dto.pocha;

import com.project.pocha.domain.pocha.Tag;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "PochaResponseDto", description = "포차 응답을 위한 데이터 타입")
public class PochaResponseDto {
    private Long pochaId;
    private Integer age;
    private Integer limitUser;
    private Integer drink;
    private Integer isSsul;
    private Integer isPrivate;
    private String ssulTitle;
    private String themeId;
    private String region;
    private List<Tag> tagList;
    private Integer totalCount;
    private Integer maleCount;
    private Integer femaleCount;
    private Integer isEnd;
    private LocalDateTime createAt;
    private LocalDateTime endAt;
}
