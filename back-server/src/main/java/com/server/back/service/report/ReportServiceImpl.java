package com.server.back.service.report;

import com.server.back.domain.report.Report;
import com.server.back.domain.report.ReportRepository;

import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.report.ReportRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Transactional
@Service
public class ReportServiceImpl implements ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    @Override
    public void userReport(ReportRequestDto requestDto){
        User repoter = userRepository.findByUserId(requestDto.getReporterId());
        User attacker = userRepository.findByUserId(requestDto.getAttackerId());
        Report report = Report.builder()
                .reportType(requestDto.getReportType())
                .reportReason(requestDto.getReportReason())
                .report_at(LocalDateTime.now())
                .reportResult(false)
                .demerit(0)
                .attackerId(attacker)
                .repoterId(repoter)
                .build();
        reportRepository.save(report);
    }
}
