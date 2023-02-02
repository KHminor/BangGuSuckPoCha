package com.server.back.dto.admin;

import com.server.back.domain.game.Balance;
import com.server.back.domain.user.Region;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "RegionResponseDto", description = "전체 지역 데이터")
public class RegionResponseDto {

    String regionCode;
    String sidoName;
    String gugunName;

    public RegionResponseDto(Region r) {
        this.regionCode = r.getRegionCode();
        this.sidoName = r.getSidoName();
        this.gugunName = r.getGugunName();

    }
}
