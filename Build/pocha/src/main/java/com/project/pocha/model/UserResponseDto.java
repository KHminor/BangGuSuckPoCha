package com.project.pocha.model;

import com.project.pocha.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDto {
    private String userName;
    private String role;

    public UserResponseDto(User user){
        this.userName = user.getUserName();
        this.role = user.getRole();
    }
}
