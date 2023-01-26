package com.server.back.dto.user;

import com.server.back.domain.user.Region;
import io.swagger.annotations.ApiModel;
import lombok.*;


@RequiredArgsConstructor
@Builder
@Data
@ApiModel(value = "UserRequestDto")
public class UserRequestDto {
    private String nickname;
    private Region region;
    private String profile;
    private String comment;
}
