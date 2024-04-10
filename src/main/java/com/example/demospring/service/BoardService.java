package com.example.demospring.service;

import com.example.demospring.dto.BoardDTO;
import com.example.demospring.entity.BoardEntity;
import com.example.demospring.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

// DTO -> Entity로 변환 후 저장 (Entitu Class)
// Entity -> DTO로 변환 후 반환 (DTO Class)
@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    public void save(BoardDTO boardDTO) {
        BoardEntity boardEntity = BoardEntity.toSaveEntity(boardDTO);
        boardRepository.save(boardEntity);
    }

}
