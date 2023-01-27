package com.server.back.dto.user;

import com.server.back.domain.user.Point;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "PointResponseDto")
public class PointResponseDto {
   private Long pointId;
   private String username;
   private String nickname;
   private String content;
   private Integer amount;
   private Integer current_point;
   private LocalDateTime create_at;
   public PointResponseDto(Point p) {
      this.pointId = p.getPointId();
      this.username = p.getUser().getUsername();
      this.nickname = p.getUser().getNickname();
      this.content = p.getContent();
      this.amount = p.getAmount();
      this.current_point = p.getCurrent_point();
      this.create_at = p.getCreate_at();
   }
}
