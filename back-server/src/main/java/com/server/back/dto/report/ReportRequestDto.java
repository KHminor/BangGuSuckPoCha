package com.server.back.dto.report;

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
@ApiModel(value = "ReportRequestDto")
public class ReportRequestDto {
    private Long reporterId;
    private Long attackerId;
    private Integer reportType;
    private String reportReason;
}