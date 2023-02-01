package com.server.back.domain.friend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FRequestRepository extends JpaRepository<FRequest, Long> {

	FRequest findByFriendRequestId(Long f_request_id);

	Long deleteByFriendRequestId(Long f_request_id);

	List<FRequest> findByToId_userId(Long my_id);

}
