package com.server.back.domain.friend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.back.dto.friend.MessageResponseDto;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{

	List<Message> findByChatId_chatId(Long chat_id);

	void deleteByChatId_chatId(Long chatId);

}
