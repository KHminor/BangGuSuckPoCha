package com.server.back.domain.review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByFromId_UserId(Long fromId);
    Review findByReviewId(Long reviewId);
}
