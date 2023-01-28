package com.server.back.domain.user;

import com.server.back.dto.user.PointRequestDto;
import com.server.back.dto.user.UserRequestDto;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id")
    private Long pointId;
    @Column(length = 100, nullable = false)
    private String content;
    @Column(nullable = false)
    private Integer amount;
    @Column(nullable = false)
    private Integer current_point;
    private LocalDateTime create_at;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Point(Long pointId, String content, Integer amount, Integer current_point,
                 LocalDateTime create_at, User user) {
        this.pointId = pointId;
        this.content = content;
        this.amount = amount;
        this.current_point = current_point;
        this.create_at = create_at;
        this.user = user;
    }
}
