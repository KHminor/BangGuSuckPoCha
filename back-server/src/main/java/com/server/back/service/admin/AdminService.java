package com.server.back.service.admin;

import com.server.back.dto.user.PointRequestDto;
import com.server.back.dto.user.PointResponseDto;
import com.server.back.dto.user.UserRequestDto;
import com.server.back.dto.user.UserResponseDto;

import java.util.List;


public interface AdminService {
    UserResponseDto userInfoList();
    UserResponseDto userMyInfo(String username);

    boolean userNicknameCheck(String nickname);
    void userUpdate(String username, UserRequestDto requestDto);
    List<PointResponseDto> userPointList(String user);
	Long findByUsername(String username);
    void usePoint(String username, PointRequestDto requestDto);
    void uesrLogout(String username);
    void userDelete(String username);
    void roleChange(String username);
}
