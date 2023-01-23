package com.project.pocha.domain.pocha;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PochaRepository extends JpaRepository<Pocha, Long> {
    Pocha findByPochaId(Long pochaId);
    List<Pocha> findByAgeAndRegionAndTheme(Integer age, String region, Theme theme);
}
