package com.server.back.dto.admin;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "UpdateReportDto")
public class UpdateReportDto {
    private Integer demerit;
    private boolean reportResult;
}