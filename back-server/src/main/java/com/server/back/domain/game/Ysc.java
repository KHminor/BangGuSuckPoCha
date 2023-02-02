package com.server.back.domain.game;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Ysc {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long yscId;
    @Column(length = 30, nullable = false)
    private String type;
    @Column(length = 30, nullable = false)
    private String word;
}
