package com.server.back.service.admin;

import com.server.back.domain.game.*;
import com.server.back.domain.pocha.Participant;
import com.server.back.domain.pocha.Pocha;
import com.server.back.domain.pocha.PochaRepository;
import com.server.back.domain.report.Report;
import com.server.back.domain.report.ReportRepository;
import com.server.back.domain.user.*;
import com.server.back.dto.admin.SignupAdminRequestDto;
import com.server.back.dto.admin.RegionResponseDto;
import com.server.back.dto.admin.UpdateReportDto;
import com.server.back.dto.game.BalanceRequestDto;
import com.server.back.dto.game.LiarRequestDto;
import com.server.back.dto.game.YscRequestDto;
import com.server.back.dto.pocha.PochaParticipantResponseDto;
import com.server.back.dto.pocha.PochaResponseDto;
import com.server.back.dto.report.ReportResponseDto;
import com.server.back.dto.user.UserRequestDto;
import com.server.back.dto.user.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Transactional
@Service
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private final PointRepository pointRepository;
    private final RegionRepository regionRepository;
    private final PochaRepository pochaRepository;
    private final ReportRepository reportRepository;
    private final YscRepository yscRepository;
    private final LiarRepository liarRepository;
    private final BalanceRepository balanceRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public void adminjoin(SignupAdminRequestDto requestDto) {
        Region region = regionRepository.findAll().get(1);
        System.out.println(region);
        User user = User.builder()
                .username(requestDto.getUsername())
                .password(bCryptPasswordEncoder.encode(requestDto.getPassword()))
                .nickname("관리자" + requestDto.getNickname())
                .profile("/profile/icon_0004.png")
                .comment(null)
                .gender("M")
                .birth("2023.02.02")
                .manner(36.5)
                .point(1000)
                .is_ban(false)
                .report_point(0)
                .role("ADMIN")
                .time(LocalDateTime.now())
                .region(region)
                .build();

        userRepository.save(user);
    }

    @Override
    public List<UserResponseDto> userInfoList() {
        List<User> user = userRepository.findAll();
        List<UserResponseDto> responseDtoList = user.stream()
                .map(l -> new UserResponseDto(l))
                .collect(Collectors.toList());
        return responseDtoList;
    }

    @Override
    public UserResponseDto adminUserSearch(String nickname) {
        User entity = userRepository.findByNickname(nickname);
        if (entity == null) {
            return null;
        }
        UserResponseDto responseDto = new UserResponseDto(entity);
        return responseDto;
    }

    @Override
    public void adminUserUpdate(String nickname, UserRequestDto requestDto) {
        User entity = userRepository.findByNickname(nickname);
        Region region = regionRepository.findById(requestDto.getRegionCode()).orElse(
                regionRepository.findAll().get(0)
        );
        entity.update(requestDto, region);
    }

    @Override
    public void userDelete(String nickname) {
        User entity = userRepository.findByNickname(nickname);
        entity.adminUserDelete();
    }

    @Override
    public List<PochaResponseDto> adminPochaList() {
        List<Pocha> pocha = pochaRepository.findAll();
        List<PochaResponseDto> responseDtoList = pocha.stream()
                .map(p -> new PochaResponseDto(p))
                .collect(Collectors.toList());
        return responseDtoList;
    }

    @Override
    public List<PochaParticipantResponseDto> adminPochaParticipant(Long pochaId) {
        Pocha pocha = pochaRepository.findByPochaId(pochaId);

        List<PochaParticipantResponseDto> responseDtoList = pocha.getParticipant().stream()
                .map(e -> new PochaParticipantResponseDto(e))
                .collect(Collectors.toList());

        return responseDtoList;
    }
    @Override
    public void adminPochaDelete(Long pochaId){
        Pocha pocha = pochaRepository.findByPochaId(pochaId);
        List<Participant> participants = pocha.getParticipant();
        for(Participant p : participants){
            if(p.getExitAt() == null){
                p.updateExit();
            }
        }
        pocha.updateEnd();
    }

    @Override
    public List<ReportResponseDto> adminReport() {
        List<Report> report = reportRepository.findAll();
        List<ReportResponseDto> responseDtoList = report.stream()
                .map(r -> new ReportResponseDto(r))
                .collect(Collectors.toList());
        return responseDtoList;
    }
    @Override
    public void adminReportUpdate(Long reportId, UpdateReportDto requestDto) {
        Report report = reportRepository.findByReportId(reportId);
        User attacker = report.getAttackerId();
        attacker.setReport_point(attacker.getReport_point()+requestDto.getDemerit());
        if (attacker.getReport_point() >= 10){
            attacker.setRole("BAN");
        }
        report.adminReportUpdate(requestDto.getDemerit());
    }
    @Override
    public void adminYscInsert(YscRequestDto requestDto) {
        Ysc ysc = Ysc.builder()
                .type(requestDto.getType())
                .word(requestDto.getWord())
                .build();
        yscRepository.save(ysc);
    }
    @Override
    public void adminLiarInsert(LiarRequestDto requestDto) {
        Liar liar = Liar.builder()
                .type(requestDto.getType())
                .word(requestDto.getWord())
                .build();
        liarRepository.save(liar);
    }
    @Override
    public void adminBalanceInsert(BalanceRequestDto requestDto) {
        Balance balance = Balance.builder()
                .type(requestDto.getType())
                .question1(requestDto.getQuestion1())
                .question2(requestDto.getQuestion2())
                .build();
        balanceRepository.save(balance);
    }
    @Override
    public void adminYscDelete(Long yscId) {
        Ysc ysc = yscRepository.findById(yscId).get();
        yscRepository.delete(ysc);
    }
    @Override
    public void adminLiarDelete(Long liarId) {
        Liar liar = liarRepository.findById(liarId).get();
        liarRepository.delete(liar);
    }
    @Override
    public void adminBalanceDelete(Long balanceId) {
        Balance balance = balanceRepository.findById(balanceId).get();
        balanceRepository.delete(balance);
    }
    @Override
    public void adminYscUpdate(Long yscId, YscRequestDto requestDto) {
        Ysc ysc = yscRepository.findById(yscId).get();
        ysc.setType(requestDto.getType());
        ysc.setWord(requestDto.getWord());
    }
    @Override
    public void adminLiarUpdate(Long liarId,LiarRequestDto requestDto) {
        Liar liar = liarRepository.findById(liarId).get();
        liar.setType(requestDto.getType());
        liar.setWord(requestDto.getWord());
    }
    @Override
    public void adminBalanceUpdate(Long balanceId, BalanceRequestDto requestDto) {
        Balance balance = balanceRepository.findById(balanceId).get();
        balance.setType(requestDto.getType());
        balance.setQuestion1(requestDto.getQuestion1());
        balance.setQuestion2(requestDto.getQuestion2());
    }
    @Override
    public List<RegionResponseDto> regionAll() {
        List<Region> region = regionRepository.findAll();
        List<RegionResponseDto> responseDtoList = region.stream()
                .map(r -> new RegionResponseDto(r))
                .collect(Collectors.toList());
        return responseDtoList;
    }
    @Override
    public boolean adminNicknameCheck(String nickname) {
        User entity = userRepository.findByNickname("관리자"+nickname);
        if (entity == null){
            return true;
        }
        return false;
    }
}
