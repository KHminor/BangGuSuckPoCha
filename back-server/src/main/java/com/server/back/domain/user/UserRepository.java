package com.server.back.domain.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByUserId(Long to_id);
	User findByUsername(String username);
	User findByNickname(String nickname);
}
