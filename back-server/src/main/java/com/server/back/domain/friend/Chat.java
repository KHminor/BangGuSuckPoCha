package com.server.back.domain.friend;

import javax.persistence.*;

import com.server.back.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="chat")
public class Chat {
	
	@Id
	@Column(name="chat_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long chatId;
	
	@ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User userId;

	
	@ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
	@JoinColumn(name="user2_id")
	private User user2Id;

}
