package com.server.back.domain.user;

import com.server.back.dto.user.UserRequestDto;
import com.server.back.jwt.refreshToken.RefreshToken;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="user_id")
    private Long userId;//우리 pk
    @Column(length = 250, nullable = false)
    private String username; //네이버 id pk
    @Column(length = 250, nullable = false)
    private String password;
    @Column(length = 250, nullable = false)
    private String nickname;
    @Column(length = 200, nullable = false)
    private String profile;
    @Column(length = 200)
    private String comment;
    @Column(length = 2, nullable = false)
    private String gender;
    @Column(length = 30, nullable = false)
    private String birth;
    @Column(nullable = false)
    private Double manner;
    @Column(nullable = false)
    private Integer point;
    @Column(nullable = false)
    private Boolean is_ban;
    @Column(nullable = false)
    private Integer report_point;
    @Column(length = 15, nullable = false)
    private String role; //USER,ADMIN 게 넣을것이다.
    private LocalDateTime time;


    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "refreshTokenId")
    private RefreshToken jwtRefreshToken;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region", nullable = false)
    private Region region;

    @Builder
    public User(Long userId, String username, String password, String nickname, String profile, String comment,
                String gender, String birth, Double manner, Integer point, Boolean is_ban, Integer report_point,
                String role, LocalDateTime time, Region region, RefreshToken jwtRefreshToken) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.profile = profile;
        this.comment = comment;
        this.gender = gender;
        this.birth = birth;
        this.manner = manner;
        this.point = point;
        this.is_ban = is_ban;
        this.report_point = report_point;
        this.role = role;
        this.time = time;
        this.region = region;
        this.jwtRefreshToken = jwtRefreshToken;
    }


    /**
     *  refresh 생성자, setter
     */
    public void createRefreshToken(RefreshToken refreshToken) {
        this.jwtRefreshToken = refreshToken;
    }
    public void SetRefreshToken(String refreshToken) {
        this.jwtRefreshToken.setRefreshToken(refreshToken);
    }

    /**
     * 사용자가 다양한 권한을 가지고 있을수 있음
     */
    public List<String> getRoleList() {
        if(this.role.length()>0) {
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }
    public void update(UserRequestDto requestDto, Region region){
        this.nickname = requestDto.getNickname();
        this.profile = requestDto.getProfile();
        this.comment = requestDto.getComment();
        this.region = region;
    }
    public void logout(){
        this.jwtRefreshToken = null;
    }
    public void userdelete(){
        this.nickname = "delete" + this.getUserId();
        this.role = "SECESSION";
    }

    public void adminUserDelete() {
        this.nickname = "delete" + this.getUserId();
        this.role = "ADMINDELETE";
    }
}
