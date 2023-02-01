package com.server.back.domain.friend;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.server.back.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="message")
public class Message {
	
	@Id
	@Column(name="message_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long messageId;

	@Column(columnDefinition = "TEXT")
	private String content;
	
	@ManyToOne(targetEntity=Chat.class, fetch=FetchType.LAZY)
	@JoinColumn(name="chat_id")
	private Chat chatId;

	@CreationTimestamp
	@Column(name = "create_at")
	private LocalDateTime createAt;
	
	@ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User userId;
	
}
