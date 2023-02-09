package com.server.back.domain.pocha;

import com.server.back.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    List<Participant> findByPochaAndUser(Pocha pocha, User user);
}
