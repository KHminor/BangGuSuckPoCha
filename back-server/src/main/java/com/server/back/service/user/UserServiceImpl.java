package com.server.back.service.user;

import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.user.UserRequestDto;
import com.server.back.dto.user.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Transactional
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    @Override
    public UserResponseDto userInfo(String username) {
        User entity = userRepository.findByUsername(username);

        UserResponseDto responseDto = new UserResponseDto(entity);

        return responseDto;
    }
    @Override
    public UserResponseDto userMyInfo(String username) {
        User entity = userRepository.findByUsername(username);

        UserResponseDto responseDto = new UserResponseDto(entity);

        return responseDto;
    }
    @Override
    public boolean userNicknameCheck(String nickname){
        User entity = userRepository.findByNickname(nickname);

        if (entity != null) {
            return false;
        }
        return true;
    }
    @Override
    public void userUpdate(String username, UserRequestDto requestDto){
        User entity = userRepository.findByUsername(username);
        entity.update(requestDto);
    }
    
	@Override
	public Long findByUsername(String username) {
		return userRepository.findByUsername(username).getUserId();
	}
    
}
