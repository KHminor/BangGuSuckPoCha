package com.server.back.domain.friend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long>{

	Chat findByChatId(Long chat_id);

	void deleteByChatId(Long chatId);

}
