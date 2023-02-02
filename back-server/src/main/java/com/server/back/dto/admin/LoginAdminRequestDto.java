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
@ApiModel(value = "LoginAdminRequestDto")
public class LoginAdminRequestDto {
    private String username;
    private String nickname;
    private String password;
}
