package com.example.demospring.service;

import com.example.demospring.dto.BoardDTO;
import com.example.demospring.entity.BoardEntity;
import com.example.demospring.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public BoardDTO update(BoardDTO boardDTO) {
        // save와 동일한 로직을 쓰는데 어떻게 구분하는가?
        // id 여부로 구분한다.
        BoardEntity boardEntity = BoardEntity.toUpdateEntity(boardDTO);
        boardRepository.save(boardEntity);
        return findById(boardDTO.getId());
    }

    public void delete(Long id) {
        boardRepository.deleteById(id);
    }

    public Page<BoardDTO> paging(Pageable pageable) {
        int page = pageable.getPageNumber() - 1; // 몇 페이지를 보고싶은지
        int pageLimit = 3; // 한 페이지에 몇개의 데이터를 보여줄지
        // 한페이지당 3개씩 글을 보여주고 정렬 기준은 id 내림차순 정렬
        // page 위치에 있는 값은 0부터 시작 그래서 -1을 해준다.
        Page<BoardEntity> boardEntities =
            boardRepository.findAll(PageRequest.of(page,pageLimit, Sort.by(Sort.Direction.DESC, "id")));    //property가 아닌 Entity 기준

        System.out.println("boardEntities.getContent() = " + boardEntities.getContent());   // 요청 페이지에 해당하는 글
        System.out.println("boardEntities.getTotalElements() = " + boardEntities.getTotalElements());   // 전체 글 수
        System.out.println("boardEntities.getNumber() = " + boardEntities.getNumber()); // DB로 요청한 페이지 번호
        System.out.println("boardEntities.getTotalPages() = " + boardEntities.getTotalPages()); // 전체 페이지 수
        System.out.println("boardEntities.getSize() = " + boardEntities.getSize()); //한페이지에 보여지는 글 개수
        System.out.println("boardEntities.getNumberOfElements() = " + boardEntities.getNumberOfElements()); // 요청 페이지에 보여지는 글 개수
        System.out.println("boardEntities.hasPrevious() = " + boardEntities.hasPrevious()); // 이전 페이지가 있는지
        System.out.println("boardEntities.isFirst() = " + boardEntities.isFirst()); // 첫번째 페이지인지
        System.out.println("boardEntities.isLast() = " + boardEntities.isLast());   // 마지막 페이지인지

        // 목록 : id, writer, title, hits, createdTime
        Page<BoardDTO> boardDTOS = boardEntities.map(board -> new BoardDTO(board.getId(), board.getBoardWriter(), board.getBoardTitle(), board.getBoardHits(), board.getCreatedTime())); //board 엔티티를 하나씩 꺼내서 옮겨줌
        // map을 이용해 엔티티를 BoardDTO로 변환해준다.
        return boardDTOS;
    }
}
