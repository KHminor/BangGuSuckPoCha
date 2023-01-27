package com.server.back.service.pocha;

import com.server.back.domain.pocha.*;
import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.pocha.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class PochaServiceImpl implements PochaService{
    private final InviteRepository inviteRepository;
    private final ParticipantRepository participantRepository;
    private final PochaRepository pochaRepository;
    private final TagRepository tagRepository;
    private final ThemeRepository themeRepository;
    private final UserRepository userRepository;

    @Override
    public List<PochaResponseDto> pochaList(PochaRequestDto requestDto) {
        List<PochaResponseDto> responseDtoList = new ArrayList<>();

        Integer age = requestDto.getAge();
        String region = requestDto.getRegion();
        String theme = requestDto.getThemeId().substring(0, 2);
        Set<String> tagSet = requestDto.getTagList().stream().collect(Collectors.toSet());

        int tagSize = tagSet.size();
        // 모든 포차 확인.
        for(Pocha p : pochaRepository.findByAgeAndRegion(age, region)){
            if(p.getIsEnd() || !p.getTheme().getThemeId().substring(0, 2).equals(theme)) continue;

            // 지정한 태그가 모두 포함된 경우만 반환.
            int validTag = 0;
            for(Tag tag : p.getTag()){
                if(tagSet.contains(tag.getTag())) validTag++;
            }
            if(validTag == tagSize) responseDtoList.add(new PochaResponseDto(p));
        }

        return responseDtoList;
    }

    @Override
    public void pochaUpdate(Long pochaId, PochaRequestDto requestDto) {
        Pocha entity = pochaRepository.findByPochaId(pochaId);
        System.out.println(">>>>>>>>>" + requestDto.getThemeId());
        Theme theme = themeRepository.findByThemeId(requestDto.getThemeId());
        System.out.println(theme.getThemeId());

        System.out.println(entity.getPochaId()+"<<<<<<<<<<<<<<");
        // 포차 업데이트.
        entity.update(requestDto, theme);

        // 태그 업데이트.
        tagRepository.deleteByPocha(entity);
        for(String tag : requestDto.getTagList()){
            Tag tEntity = Tag.builder().pocha(entity).tag(tag).build();
            tagRepository.save(tEntity);
        }
    }

    @Override
    public Long pochaInsert(PochaRequestDto requestDto) {
        // 테마 확인
        Theme theme = themeRepository.findByThemeId(requestDto.getThemeId());

        // 새로운 포차 생성
        Pocha pocha = Pocha.builder()
                .theme(theme)
                .age(requestDto.getAge())
                .region(requestDto.getRegion())
                .isPrivate(requestDto.getIsPrivate())
                .limitUser(requestDto.getLimitUser())
                .endAt(LocalDateTime.now().plusHours(2))
                .isSsul(false)
                .alcohol(0)
                .isEnd(false)
                .build();

        // 포차 추가.
        Pocha entity = pochaRepository.save(pocha);

        // 태그 추가.
        for(String tag : requestDto.getTagList()){
            tagRepository.save(Tag.builder()
                    .pocha(entity)
                    .tag(tag)
                    .build());
        }
        return entity.getPochaId();
    }

    @Override
    public PochaResponseDto pochaInfo(Long pochaId) {
        Pocha entity = pochaRepository.findByPochaId(pochaId);

        PochaResponseDto responseDto = new PochaResponseDto(entity);

        return responseDto;
    }

    @Override
    public void pochaEnd(Long pochaId) {
        Pocha entity = pochaRepository.findByPochaId(pochaId);
        entity.updateEnd();
    }

    @Override
    public List<PochaParticipantResponseDto> pochaParticipantList(Long pochaId) {
        Pocha pocha = pochaRepository.findByPochaId(pochaId);

        List<PochaParticipantResponseDto> responseDtoList = pocha.getParticipant().stream()
                        .map(e -> new PochaParticipantResponseDto(e))
                        .collect(Collectors.toList());

        return responseDtoList;
    }

    @Override
    public void pochaExtension(Long pochaId) {
        Pocha entity = pochaRepository.findByPochaId(pochaId);
        entity.updateExtension();
    }

    @Override
    public void pochaEnter(PochaParticipantRequestDto requestDto) {
        Pocha pocha = pochaRepository.findByPochaId(requestDto.getPochaId());
        User user = userRepository.findByUsername(requestDto.getUsername());
        Participant participant = Participant.builder()
                .pocha(pocha)
                .user(user)
                .isHost(requestDto.getIsHost())
                .waiting(requestDto.getWaiting())
                .build();
        participantRepository.save(participant);
    }

    @Override
    public void pochaExit(PochaParticipantRequestDto requestDto) {
        Pocha pocha = pochaRepository.findByPochaId(requestDto.getPochaId());
        User user = userRepository.findByUsername(requestDto.getUsername());

        Participant entity = participantRepository.findByPochaAndUser(pocha, user);
        entity.updateExit();

        // 유저 평가 추가!!!
    }

    @Override
    public void pochaAlcohol(Long pochaId) {
        Pocha entity = pochaRepository.findByPochaId(pochaId);

        int count = 0;
        for(Participant p : entity.getParticipant()){
            if(p.getExitAt() == null){
                count += 1;
            }
        }

        entity.updateAlcohol(count);
    }

    @Override
    public void pochaSsul(Long pochaId, SsulReqeustDto reqeustDto) {
        Pocha pocha = pochaRepository.findByPochaId(pochaId);
        pocha.updateSsul(reqeustDto);
    }

    @Override
    public List<InviteResponseDto> pochaInviteList(String username) {
        User user = userRepository.findByUsername(username);
        List<InviteResponseDto> responseDtoList = new ArrayList<>();
        // 유효한 포차인지 확인하여 추가.
        inviteRepository.findByToUserOrderByCreateAtDesc(user).forEach(invite -> {
            if(!invite.getPocha().getIsEnd()){
                responseDtoList.add(new InviteResponseDto(invite));
            }
        });

        return responseDtoList;
    }

    @Override
    public void pochaInvite(InviteRequestDto requestDto) {
        User fromUser = userRepository.findByUsername(requestDto.getFromUsername());
        User toUser = userRepository.findByUsername(requestDto.getToUsername());
        Pocha pocha = pochaRepository.findByPochaId(requestDto.getPochaId());

        Invite invite = Invite.builder()
                .fromUser(fromUser)
                .toUser(toUser)
                .pocha(pocha)
                .build();

        // 초대 추가.
        Invite entity = inviteRepository.save(invite);
    }

    @Override
    public void pochaInviteRefuse(Long inviteId) {
        inviteRepository.deleteById(inviteId);
        Invite invite = inviteRepository.findById(inviteId).orElse(null);
    }

    @Override
    public boolean pochaInviteAccept(Long inviteId, Long pochaId) {
        Invite invite = inviteRepository.findById(inviteId).orElse(null);

        inviteRepository.deleteById(invite.getInviteId());
        if(invite != null) {
            User user = invite.getToUser();
            Pocha pocha = invite.getPocha();

            if(pocha.getIsEnd()){
                return false;
            }

            // 참여 인원 수 계산
            int participantToal = 0;
            for(Participant p : pocha.getParticipant()){
                if(p.getExitAt() == null) participantToal++;
            }
            // 참여가 가능하다면 참여.
            if(pocha.getLimitUser() > participantToal) {
                pochaEnter(PochaParticipantRequestDto.builder().pochaId(pocha.getPochaId()).username(user.getUsername()).isHost(false).waiting(false).build());

                return true;
            }
        }

        // 불가능하다면 불참.
        return false;
    }
}
