package com.project.pocha.domain.pocha;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Participant extends BaseTimeEntity{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;
    @ManyToOne(targetEntity = Pocha.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "pocah_id")
    private Pocha pocha;
    // 이용자 식별자
    /*@ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;*/
    private Integer isHost;
    private LocalDateTime endAt;
    @Column(nullable = false)
    private Integer waiting;


}
