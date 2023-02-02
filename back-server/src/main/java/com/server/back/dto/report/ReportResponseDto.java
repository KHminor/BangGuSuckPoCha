package com.server.back.dto.report;

import com.server.back.domain.report.Report;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "ReportResponseDto")
public class ReportResponseDto {
    private Long reporterId;
    private Long attackerId;
    private Integer reportType;
    private String reportReason;
    private LocalDateTime report_at;
    public ReportResponseDto(Report r){
        this.reporterId = r.getReportId();
        this.attackerId = r.getAttackerId().getUserId();
        this.reportType = r.getReportType();
        this.reportReason = r.getReportReason();
        this.report_at = LocalDateTime.now();
    }
}