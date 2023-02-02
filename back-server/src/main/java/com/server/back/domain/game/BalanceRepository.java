package com.server.back.domain.game;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BalanceRepository extends JpaRepository<Balance, Long> {
    List<Balance> findByType(Integer type);
}
