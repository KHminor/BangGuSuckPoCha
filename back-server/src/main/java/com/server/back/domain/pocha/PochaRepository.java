package com.server.back.domain.pocha;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PochaRepository extends JpaRepository<Pocha, Long> {
    Pocha findByPochaId(Long pochaId);

    List<Pocha> findByAgeAndRegion(Integer age, String region);

    List<Pocha> findByIsEnd(Boolean isEnd);
}
