package com.server.back.domain.pocha;

import com.server.back.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Participant{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;
    @ManyToOne(targetEntity = Pocha.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "pocha_id")
    private Pocha pocha;
    // 이용자 식별자
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @Column(nullable = false)
    private Boolean isHost;
    @Column(nullable=false)
    private LocalDateTime createAt;
    private LocalDateTime exitAt;

    public void updateExit() {
        this.exitAt = LocalDateTime.now();
    }
    public void updateCreate() {this.createAt = LocalDateTime.now();}

    public void updateHost() {
        this.isHost = true;
    }
}
