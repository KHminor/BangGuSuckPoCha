package com.server.back.service.pocha;

import com.server.back.dto.pocha.*;

import java.util.List;

public interface PochaService {
    List<PochaResponseDto> pochaList(PochaRequestDto requestDto);

    void pochaUpdate(Long pochaId, PochaRequestDto requestDto);

    Long pochaInsert(PochaRequestDto requestDto);

    PochaResponseDto pochaInfo(Long pochaId);

    void pochaEnd(Long pochaId);

    List<PochaParticipantResponseDto> pochaParticipantList(Long pochaId);

    void pochaExtension(Long pochaId);

    void pochaEnter(PochaParticipantRequestDto requestDto);

    void pochaExit(PochaParticipantRequestDto requestDto);

    void pochaAlcohol(Long pochaId);

    void pochaSsul(Long pochaId, SsulReqeustDto reqeustDto);
}
