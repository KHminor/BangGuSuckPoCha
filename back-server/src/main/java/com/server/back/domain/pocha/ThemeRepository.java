package com.server.back.domain.pocha;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeRepository extends JpaRepository<Theme, String> {
    Theme findByThemeId(String themeId);
}
