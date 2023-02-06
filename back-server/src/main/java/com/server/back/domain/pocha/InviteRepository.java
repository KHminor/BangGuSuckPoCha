package com.server.back.domain.pocha;

import com.server.back.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InviteRepository extends JpaRepository<Invite, Long> {
    List<Invite> findByToUserOrderByCreateAtDesc(User fromUser);
    Invite findByToUserAndPocha(User toUser, Pocha pocha);
}
