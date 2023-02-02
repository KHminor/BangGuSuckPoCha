package com.server.back.domain.game;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Liar {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long liarId;
    @Column(length = 30, nullable = false)
    private String type;
    @Column(length = 30, nullable = false)
    private String word;
}
