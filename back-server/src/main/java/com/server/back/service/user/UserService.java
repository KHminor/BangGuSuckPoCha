package com.server.back.service.user;

import com.server.back.dto.user.*;


public interface UserService {
    UserResponseDto userMyInfo(String username);
    UserResponseDto userInfo(String username);

    boolean userNicknameCheck(String nickname);
    void userUpdate(String username, UserRequestDto requestDto);
	Long findByUsername(String username);
}
