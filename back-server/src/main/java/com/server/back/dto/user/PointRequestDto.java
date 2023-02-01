package com.server.back.dto.user;

import io.swagger.annotations.ApiModel;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "PointRequestDto")
public class PointRequestDto {
    private Integer amount;
    private String content;
}
