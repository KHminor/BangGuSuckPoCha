package com.project.pocha.domain.pocha;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
