package com.server.back.domain.report;

import com.server.back.domain.user.User;
import com.server.back.dto.admin.UpdateReportDto;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;
    @Column(nullable = false)
    private Integer reportType;
    private String reportReason;
    @Column(nullable = false)
    private LocalDateTime report_at;
    @Column(nullable = false)
    private Boolean reportResult;
    @Column(nullable = false)
    private Integer demerit;


    @ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
    @JoinColumn(name="attacker_id")
    private User attackerId;

    @ManyToOne(targetEntity=User.class, fetch=FetchType.LAZY)
    @JoinColumn(name="repoter_id")
    private User repoterId;

    @Builder
    public Report(Long reportId, Integer reportType, String reportReason, LocalDateTime report_at, Boolean reportResult,
                  Integer demerit, User attackerId, User repoterId) {
        this.reportId = reportId;
        this.reportType = reportType;
        this.reportReason = reportReason;
        this.report_at = report_at;
        this.reportResult = reportResult;
        this.demerit = demerit;
        this.attackerId = attackerId;
        this.repoterId = repoterId;
    }

    public void adminReportUpdate(Integer demerit) {
        this.demerit = demerit;
        this.reportResult = Boolean.TRUE;
    }
}
