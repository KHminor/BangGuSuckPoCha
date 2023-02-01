package com.server.back.service.admin;

import com.server.back.dto.admin.UpdateReportDto;
import com.server.back.dto.pocha.PochaParticipantResponseDto;
import com.server.back.dto.pocha.PochaResponseDto;
import com.server.back.dto.report.ReportRequestDto;
import com.server.back.dto.report.ReportResponseDto;
import com.server.back.dto.user.PointRequestDto;
import com.server.back.dto.user.PointResponseDto;
import com.server.back.dto.user.UserRequestDto;
import com.server.back.dto.user.UserResponseDto;

import java.util.List;


public interface AdminService {
    List<UserResponseDto> userInfoList();

    UserResponseDto adminUserSearch(String nickname);

    void adminUserUpdate(String nickname, UserRequestDto requestDto);

    void userDelete(String nickname);

    List<PochaResponseDto> adminPochaList();

    List<PochaParticipantResponseDto> adminPochaParticipant(Long pochaId);

    void adminPochaDelete(Long pochaId);
    List<ReportResponseDto> adminReport();
    void adminReportUpdate(Long report_id, UpdateReportDto requestDto);
}