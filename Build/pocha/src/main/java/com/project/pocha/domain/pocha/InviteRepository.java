package com.project.pocha.domain.pocha;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InviteRepository extends JpaRepository<Invite, Long> {
    // 수신자로 초대 목록 요청.
    // 수신자로 초대 제거.
}
