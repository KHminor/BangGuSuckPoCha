package com.server.back.dto.review;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "ReviewRequestDto")
public class ReviewRequestDto {
    private Long reviewId;
    private String toUsername;
    private Integer reviewScore;
}