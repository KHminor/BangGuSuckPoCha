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
    private Long reportId;
    private Long reporterId;
    private String repoterName;
    private Long attackerId;
    private String attackerName;
    private Integer reportType;
    private String reportReason;
    private Boolean reportResult;
    private Integer demerit;
    private LocalDateTime report_at;
    public ReportResponseDto(Report r){
        this.demerit = r.getDemerit();
        this.reportResult = r.getReportResult();
        this.reportId = r.getReportId();
        this.reporterId = r.getReportId();
        this.repoterName = r.getRepoterId().getNickname();
        this.attackerId = r.getAttackerId().getUserId();
        this.attackerName = r.getAttackerId().getNickname();
        this.reportType = r.getReportType();
        this.reportReason = r.getReportReason();
        this.report_at = LocalDateTime.now();
    }
}