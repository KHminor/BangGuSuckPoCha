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

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Entity(name="friend")
public class Friend {
	
	@Id
	@Column(name="friend_id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long friendId;
	
//	@ManyToOne(targetEntity=UserEntity.class, fetch=FetchType.LAZY)
//	@JoinColumn(name="your_id", insertable = false, updatable = false)
//	private UserEntity your;
	
	@Column(nullable=false, name="your_id")
	private Long yourId;
	
//	@ManyToOne(targetEntity=UserEntity.class, fetch=FetchType.LAZY)
//	@JoinColumn(name="my_id", insertable = false, updatable = false)
//	private UserEntity my;
	
	@Column(nullable=false, name = "my_id")
	private Long myId;
	
	@Column(nullable=false, name = "best_friend")
	@ColumnDefault("false")
	private Boolean bestFriend;
	
	@Builder
	public Friend(Long yourId, Long myId, Boolean bestFriend) {
		this.yourId = yourId;
		this.myId = myId;
		this.bestFriend = bestFriend;
	}
	
	public void update() {
		this.bestFriend = !bestFriend;
	}

}
