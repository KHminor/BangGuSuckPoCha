package com.server.back.service.review;

import com.server.back.dto.review.ReviewRequestDto;
import com.server.back.dto.review.ReviewResponseDto;

import java.util.List;


public interface ReviewService {
    List<ReviewResponseDto> userReviewList(String username);
    void userReview(ReviewRequestDto requestDto);
}
