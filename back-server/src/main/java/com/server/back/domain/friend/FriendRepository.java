package com.server.back.domain.friend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long>{

	List<Friend> findByMyId(Long userId);

	Friend findByMyIdAndYourId(Long myId, Long you_id);

	Long deleteByFriendId(Long myFriendId);

}
