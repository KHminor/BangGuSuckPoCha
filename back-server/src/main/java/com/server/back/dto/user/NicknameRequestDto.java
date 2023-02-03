package com.server.back.dto.user;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "NicknameRequestDto")
public class NicknameRequestDto {
    private String nowName;
    private String changeName;
}
