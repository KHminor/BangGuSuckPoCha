package com.server.back.dto.user;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "PointResponseDto")
public class PointResponseDto {
   private Long pocha_id;
   private String userame;
   private String nickname;
   private String content;
   private Integer amount;
   private Integer current_point;
   private LocalDateTime create_at;
}
