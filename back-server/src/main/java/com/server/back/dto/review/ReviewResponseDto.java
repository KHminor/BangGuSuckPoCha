package com.server.back.dto.review;

import com.server.back.domain.review.Review;
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
@ApiModel(value = "ReviewResponseDto")
public class ReviewResponseDto {
   private Long reviewId;
   private String to_username;
   private String to_nickname;
   private String to_profile;
   private String to_comment;
   private Integer review_score;
   private LocalDateTime create_at;
   private LocalDateTime review_at;
   public ReviewResponseDto(Review r) {
      this.reviewId = r.getReviewId();
      this.to_username = r.getToId().getUsername();
      this.to_nickname = r.getToId().getNickname();
      this.to_comment = r.getToId().getComment();
      this.to_profile = r.getToId().getProfile();
      this.review_score = r.getReviewScore();
      this.create_at = r.getCreate_at();
      this.review_at = r.getReview_at();
   }
}
