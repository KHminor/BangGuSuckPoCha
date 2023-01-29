package com.server.back.service.review;


import com.server.back.domain.pocha.Pocha;
import com.server.back.domain.review.Review;
import com.server.back.domain.review.ReviewRepository;

import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.review.ReviewRequestDto;
import com.server.back.dto.review.ReviewResponseDto;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Transactional
@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Override
    public List<ReviewResponseDto> userReviewList(String username){
        Long userId = userRepository.findByUsername(username).getUserId();
        List<Review> review = reviewRepository.findByUser_UserId(userId);
        List<ReviewResponseDto> responseDtoList = review.stream()
                .map(r -> new ReviewResponseDto(r))
                .collect(Collectors.toList());
        return responseDtoList;
    }
    @Override //유저리뷰 언제 쓰는건지? fromId가 없어도 되는건지??
    public void userReview(ReviewRequestDto requestDto){
        User user = userRepository.findByUsername(requestDto.getToUsername());
        Review review = Review.builder()
                .user(user)
                .reviewId(requestDto.getReviewId())
                .reviewScore(requestDto.getReviewScore())
                .review_at(LocalDateTime.now())
                .build();
        reviewRepository.save(review);
//        this.reviewId = reviewId;
//        this.reviewScore = reviewScore;
//        this.create_at = create_at;
//        this.review_at = review_at.plusDays(3);
//        this.pocha = pocha;
//        this.toId = toId;
//        this.fromId = fromId;
    }
}
