package com.project.pocha.domain.pocha;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Pocha extends BaseTimeEntity{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pochaId;

    @Column(nullable = false)
    private Integer age;
    @Column(nullable = false)
    private Integer limitUser;
    @Column(nullable = false)
    private Integer isPrivate;
    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "theme_id", nullable = false)
    private Theme theme;
    @Column(length = 50, nullable = false)
    private String region;
    @Column(nullable = false)
    private Integer alcohol;
    @Column(nullable = false)
    private Integer isSsul;
    @Column(length = 40)
    private String ssulTitle;
    @Column(nullable = false)
    private LocalDateTime endAt;
    @Column(nullable = false)
    private Integer isEnd;

    // 포차 태그
    @OneToMany(mappedBy = "pocha", fetch = FetchType.LAZY)
    private List<Tag> tag;

    // 참가자 리스트
    @OneToMany(mappedBy = "pocha", fetch = FetchType.LAZY)
    private List<Participant> participant;

    // 포차 초대
    @OneToMany(mappedBy = "pocha", fetch = FetchType.LAZY)
    private List<Invite> invite;

    // 유저 평가


    public void updateTag(List<Tag> tagList){
        this.tag = tagList;
    }


}
