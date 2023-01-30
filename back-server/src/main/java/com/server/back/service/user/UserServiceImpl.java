package com.server.back.service.user;

import com.server.back.domain.pocha.Pocha;
import com.server.back.domain.user.*;
import com.server.back.dto.user.PointRequestDto;
import com.server.back.dto.user.PointResponseDto;
import com.server.back.dto.user.UserRequestDto;
import com.server.back.dto.user.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Transactional
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PointRepository pointRepository;
    private final RegionRepository regionRepository;

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

        return entity == null;
    }
    @Override
    public void userUpdate(String username, UserRequestDto requestDto){
        User entity = userRepository.findByUsername(username);
        Region region = regionRepository.findById(requestDto.getRegionCode()).orElse(
                regionRepository.findAll().get(0)
        );
        entity.update(requestDto, region);
    }
    @Override
    public List<PointResponseDto> userPointList(String username){
        Long userId = userRepository.findByUsername(username).getUserId();
        List<Point> point = pointRepository.findByUser_UserId(userId);
        List<PointResponseDto> responseDtoList = point.stream()
                .map(p -> new PointResponseDto(p))
                .collect(Collectors.toList());
        return responseDtoList;
    }
    @Override
    public void usePoint(String username, PointRequestDto requestDto){
        User entity = userRepository.findByUsername(username);
        entity.setPoint(entity.getPoint()+ requestDto.getAmount());
        Point point = Point.builder()
            .content(requestDto.getContent())
            .amount(requestDto.getAmount())
            .current_point(entity.getPoint())
            .create_at(LocalDateTime.now())
            .user(entity)
            .build();
        pointRepository.save(point);

    }
	@Override
	public Long findByUsername(String username) {
		return userRepository.findByUsername(username).getUserId();
	}
    
}
