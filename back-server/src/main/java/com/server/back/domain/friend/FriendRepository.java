package com.server.back.domain.friend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long>{

	Long deleteByFriendId(Long myFriendId);

	Friend findByMyId_userIdAndYourId_userId(Long my_id, Long you_id);

	List<Friend> findByMyId_userId(Long userId);

}
