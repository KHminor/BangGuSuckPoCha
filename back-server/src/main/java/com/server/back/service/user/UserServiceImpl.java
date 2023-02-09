package com.server.back.service.user;

import com.server.back.domain.user.*;
import com.server.back.dto.user.*;
import com.server.back.jwt.refreshToken.RefreshToken;
import com.server.back.jwt.refreshToken.RefreshTokenRepository;
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
    private final RefreshTokenRepository refreshTokenRepository;

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
    public boolean userNicknameCheck(NicknameRequestDto requestDto) {
        int count = 0;
        for (User r : userRepository.findAll()) {
            if (r.getNickname().equals(requestDto.getChangeName())){
                count += 1;
            }
        }
        if (count == 0) {
            if (requestDto.getNowName().equals(requestDto.getChangeName())==false) {
                return true;
            }
        } else if (count == 1) {
            if (requestDto.getNowName().equals(requestDto.getChangeName())) {
                return true;
            }
        }
        return false;
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
    public void uesrLogout(String username){
        User entity = userRepository.findByUsername(username);
        RefreshToken token = refreshTokenRepository.findRefreshTokenById(entity.getJwtRefreshToken().getId());
        refreshTokenRepository.delete(token);
        entity.logout();
    }
    @Override
    public void userDelete(String username){
        User entity = userRepository.findByUsername(username);
        RefreshToken token = refreshTokenRepository.findRefreshTokenById(entity.getJwtRefreshToken().getId());
        refreshTokenRepository.delete(token);
        entity.logout();
        entity.userdelete();
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
    public boolean usePoint(String username, PointRequestDto requestDto){
        User entity = userRepository.findByUsername(username);
        int total = entity.getPoint()+ requestDto.getAmount();
        if(total >= 0) {
            entity.setPoint(total);
            Point point = Point.builder()
                    .content(requestDto.getContent())
                    .amount(requestDto.getAmount())
                    .current_point(entity.getPoint())
                    .create_at(LocalDateTime.now())
                    .user(entity)
                    .build();
            pointRepository.save(point);
            return true;
        }
        return false;
    }
    @Override
    public void roleChange(String username){
        User entity = userRepository.findByUsername(username);
        entity.setRole("USER");
    }
	@Override
	public Long findByUsername(String username) {
		return userRepository.findByUsername(username).getUserId();
	}
    
}
