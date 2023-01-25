package com.server.back.domain.pocha;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InviteRepository extends JpaRepository<Invite, Long> {
    // 수신자로 초대 목록 요청.
    // 수신자로 초대 제거.
}
