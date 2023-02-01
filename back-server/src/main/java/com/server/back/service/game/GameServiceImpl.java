package com.server.back.service.game;

import com.server.back.domain.game.BalanceRepository;
import com.server.back.domain.game.LiarRepository;
import com.server.back.domain.game.YscRepository;
import com.server.back.dto.game.BalanceResponseDto;
import com.server.back.dto.game.LiarResponseDto;
import com.server.back.dto.game.YscResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class GameServiceImpl implements GameService {
    private final YscRepository yscRepository;
    private final LiarRepository liarRepository;
    private final BalanceRepository balanceRepository;
    @Override
    public List<YscResponseDto> gameYsc() {
        return yscRepository.findAll(Sort.by(Sort.Direction.ASC, "type")).stream()
                .map(e -> new YscResponseDto(e))
                .collect(Collectors.toList());
    }
    @Override
    public List<LiarResponseDto> gameLiar() {
        return liarRepository.findAll(Sort.by(Sort.Direction.ASC, "type")).stream()
                .map(e -> new LiarResponseDto(e))
                .collect(Collectors.toList());
    }

    @Override
    public List<BalanceResponseDto> gameBalance(Integer type) {
        return balanceRepository.findByType(type).stream()
                .map(e -> new BalanceResponseDto(e))
                .collect(Collectors.toList());
    }
}
