package com.server.back.service.report;


import com.server.back.dto.report.ReportRequestDto;

public interface ReportService {
    void userReport(ReportRequestDto requestDto);
}
