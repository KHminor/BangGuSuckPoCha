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
public class Liar {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long yscId;
    @Column(length = 30, nullable = false)
    private String type;
    @Column(length = 30, nullable = false)
    private String word;
}
