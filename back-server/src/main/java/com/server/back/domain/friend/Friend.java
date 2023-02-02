package com.server.back.domain.friend;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import com.server.back.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@AllArgsConstructor
@Getter
@Builder
@NoArgsConstructor
@Entity(name="friend")
public class Friend {
	
	@Id
	@Column(name="friend_id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long friendId;
	
	@ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
	@JoinColumn(name="your_id")
	private User yourId;

	
	@ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
	@JoinColumn(name="my_id")
	private User myId;
	
	@Column(nullable=false, name = "best_friend")
	@ColumnDefault("false")
	private Boolean bestFriend;
	
	@ManyToOne(targetEntity=Chat.class, fetch=FetchType.LAZY)
	@JoinColumn(name="chat_id")
	private Chat chatId;
	
	
	public void update() {
		this.bestFriend = !bestFriend;
	}

}
