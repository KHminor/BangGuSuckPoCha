package com.server.back.service.report;

import com.server.back.domain.report.Report;
import com.server.back.domain.report.ReportRepository;

import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.dto.report.ReportRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReportServiceImpl implements ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    @Override
    public void userReport(ReportRequestDto requestDto){
        User repoterId = userRepository.findByUserId(requestDto.getReporterId());
        User attackerId = userRepository.findByUserId(requestDto.getAttackerId());
        Report report = Report.builder()
                .repoterId(repoterId)
                .reportType(requestDto.getReportType())
                .reportReason(requestDto.getReportReason())
                .attackerId(attackerId)
                .build();
        reportRepository.save(report);
    }
}
