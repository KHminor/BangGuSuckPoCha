package com.project.pocha.domain.pocha;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import springfox.documentation.annotations.ApiIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Invite extends BaseTimeEntity{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inviteId;
    // 수신자, 발신자
    /*
    @ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
    @JoinColumn(name = "from_id", nullable = false)
    private User fromUser;

    @ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
    @JoinColumn(name = "to_id", nullable = false)
    private User toUser;
    */
    @ManyToOne(targetEntity = Pocha.class, fetch = FetchType.LAZY)
    @JoinColumn(name="pocha_id")
    private Pocha pocha;

}
