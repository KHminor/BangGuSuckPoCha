package com.server.back.domain.game;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Balance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long balanceId;
    private Integer type;
    @Column(length = 100, nullable = false)
    private String question1;
    @Column(length = 100, nullable = false)
    private String question2;
}
