package com.server.back.dto.pocha;

import com.server.back.domain.pocha.Invite;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "InviteResponseDto", description = "포차 초대 응답을 위한 데이터 타입")
public class InviteResponseDto {
    private Long inviteId;
    private Long pochaId;
    private String fromUsername;
    private String fromNickname;
    private String fromProfile;

    public InviteResponseDto(Invite e) {
        this.inviteId = e.getInviteId();
        this.pochaId = e.getPocha().getPochaId();
        this.fromUsername = e.getFromUser().getUsername();
        this.fromNickname = e.getFromUser().getNickname();
        this.fromProfile = e.getFromUser().getProfile();
    }
}
