package com.server.back.dto.user;

import com.server.back.domain.user.Region;
import io.swagger.annotations.ApiModel;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "UserRequestDto")
public class UserRequestDto {
    private String nickname;
    private String regionCode;
    private String profile;
    private String comment;
}
