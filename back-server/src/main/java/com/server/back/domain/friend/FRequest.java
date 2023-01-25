package com.server.back.domain.friend;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="f_request")
public class FRequest {

	@Id
	@Column(name="f_request_id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long friendRequestId;
	
//	@ManyToOne(targetEntity=UserEntity.class, fetch=FetchType.LAZY)
//	@JoinColumn(name="from_id", insertable = false, updatable = false)
//	private UserEntity from;
	
	@Column(name="from_id", nullable=false)
	private Long fromId;
	
//	@ManyToOne(targetEntity=UserEntity.class, fetch=FetchType.LAZY)
//	@JoinColumn(name="to_id", insertable = false, updatable = false)
//	private UserEntity to;
	
	@Column(name="to_id", nullable=false)
	private Long toId;
	
	@Builder
	public FRequest(Long fromId,Long toId ) {
		this.fromId = fromId;
		this.toId = toId;
	}
}
