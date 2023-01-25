package com.server.back.domain.pocha;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Theme {
    @Id
    @Column(length = 50, nullable = false)
    private String themeId;

    @Column(length = 200, nullable = false)
    private String background;

    @Column(length = 200, nullable = false)
    private String bgm;


}
