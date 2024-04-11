package com.example.demospring.service;

import com.example.demospring.dto.BoardDTO;
import com.example.demospring.entity.BoardEntity;
import com.example.demospring.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<BoardDTO> findAll() {
        // findAll 을 통해서 repository에 있는 데이터를 가져올때는 Entity로 가져오는데 모두 가져오기 때문에 list로 받아온다.
        List<BoardEntity> boardEntityList = boardRepository.findAll();
        List<BoardDTO> boardDTOList = new ArrayList<>();

        for (BoardEntity boardEntity : boardEntityList) {
            boardDTOList.add(BoardDTO.toBoardDTO(boardEntity));
        }
        return boardDTOList;
    }

    @Transactional
    public void updateHits(Long id) {
        boardRepository.updateHits(id);
    }

    @Transactional
    public BoardDTO findById(Long id) {
        Optional<BoardEntity> optionalBoardEntity = boardRepository.findById(id);
        if (optionalBoardEntity.isPresent()) {
            BoardEntity boardEntity = optionalBoardEntity.get();
            return BoardDTO.toBoardDTO(boardEntity);
        } else {
            return null;
        }
    }
}
