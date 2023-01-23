package com.project.pocha.domain.pocha;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByPocha(Pocha pocha);
    void deleteByPocha(Pocha pocha);
}
