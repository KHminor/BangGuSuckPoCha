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
public class Pocha{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pochaId;
    @Column(nullable = false)
    private Integer age;
    @Column(nullable = false)
    private Integer limitUser;
    @Column(nullable = false)
    private Boolean isPrivate;
    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "theme_id", nullable = false)
    private Theme theme;
    @Column(length = 50, nullable = false)
    private String region;
    @Column(nullable = false)
    private Integer alcohol;
    @Column(nullable = false)
    private Boolean isSsul;
    @Column(length = 40)
    private String ssulTitle;
    @Column(nullable = false)
    private LocalDateTime createAt;
    @Column(nullable = false)
    private LocalDateTime endAt;
    @Column(nullable = false)
    private Boolean isEnd;
    @Column(nullable = false)
    private Boolean isWaiting;

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
        this.isEnd = true;
        this.endAt = LocalDateTime.now();
    }

    public void updateExtension() {
        this.endAt = endAt.plusHours(1);
    }

    public void updateAlcohol(int count) {
        this.alcohol += count;
    }

    public void updateSsul(SsulReqeustDto reqeustDto) {
        this.isSsul = true;
        this.ssulTitle = reqeustDto.getSsulTitle();
    }
    public void startHuntingPocha(){
        LocalDateTime now = LocalDateTime.now();
        this.createAt = now;
        this.endAt = now.plusHours(2);
        this.isWaiting = false;
    }
}
