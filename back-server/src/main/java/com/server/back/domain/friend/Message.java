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
	
//	@Temporal(TemporalType.TIMESTAMP)
//	@Column(name="create_at")
//	private java.util.Date timestampField;
	
//	@CreationTimestamp
//	@Column(name="create_at")
//	private LocalDateTime time;
	
//	@Column(name = "create_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
//	public Timestamp createAt;

	@CreationTimestamp
	@Column(name = "create_at")
	private LocalDateTime createAt;
	
	@ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User userId;
	
}
