package com.server.back.domain.pocha;

import com.server.back.dto.pocha.PochaRequestDto;
import com.server.back.dto.pocha.SsulReqeustDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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


    public void update(PochaRequestDto requestDto, Theme theme) {
        this.region = requestDto.getRegion();
        this.age = requestDto.getAge();
        this.isPrivate = requestDto.getIsPrivate();
        this.limitUser = requestDto.getLimitUser();
        this.theme = theme;
    }

    public void updateEnd() {
        this.isEnd = 1;
        this.endAt = LocalDateTime.now();
    }

    public void updateExtension() {
        this.endAt = endAt.plusHours(1);
    }

    public void updateAlcohol(int count) {
        this.alcohol += count;
    }

    public void updateSsul(SsulReqeustDto reqeustDto) {
        this.isSsul = 1;
        this.ssulTitle = reqeustDto.getSsulTitle();
    }
}
