package com.server.back.dto.admin;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "SignupAdminRequestDto")
public class SignupAdminRequestDto {
    private String username;
    private String nickname;
    private String password;
}
