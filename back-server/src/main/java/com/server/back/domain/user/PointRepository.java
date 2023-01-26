package com.server.back.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Region, String> {
}
