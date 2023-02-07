package com.server.back.service.review;


import com.server.back.domain.review.Review;
import com.server.back.domain.review.ReviewRepository;

import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.review.ReviewRequestDto;
import com.server.back.dto.review.ReviewResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        List<Review> review = reviewRepository.findByFromId_UserId(userId);
        List<ReviewResponseDto> responseDtoList = review.stream()
                .map(r -> new ReviewResponseDto(r))
                .collect(Collectors.toList());
        return responseDtoList;
    }
    @Override
    public void userReview(ReviewRequestDto requestDto){
        User user = userRepository.findByUsername(requestDto.getToUsername());
        Review review = reviewRepository.findByReviewId(requestDto.getReviewId());
        user.setManner(user.getManner()+((requestDto.getReviewScore()-3.0)/10));
        review.update(requestDto);
    }
}
