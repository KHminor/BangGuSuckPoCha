package com.server.back.service.game;

import com.server.back.dto.game.BalanceResponseDto;
import com.server.back.dto.game.LiarResponseDto;
import com.server.back.dto.game.YscResponseDto;

import java.util.List;

public interface GameService {
    List<YscResponseDto> gameYsc();
    List<LiarResponseDto> gameLiar();
    List<BalanceResponseDto> gameBalance(Integer type);
}
