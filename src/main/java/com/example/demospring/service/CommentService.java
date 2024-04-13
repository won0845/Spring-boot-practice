package com.example.demospring.service;

import com.example.demospring.dto.BoardDTO;
import com.example.demospring.dto.CommentDTO;
import com.example.demospring.entity.BoardEntity;
import com.example.demospring.entity.CommentEntity;
import com.example.demospring.repository.BoardRepository;
import com.example.demospring.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;


    public Long save(CommentDTO commentDTO) {
        /* 부모엔티티(BoardEntity) 조회*/
        // Board의 findById를 할때는 boardId가 필요한데 이것은 CommentDTO에 있다.
        Optional<BoardEntity> optionalBoardEntity =  boardRepository.findById(commentDTO.getBoardId());
        if (optionalBoardEntity.isPresent()){
            BoardEntity boardEntity = optionalBoardEntity.get();
            CommentEntity commentEntity = CommentEntity.toSaveEntity(commentDTO, boardEntity); // 클래스 메소드로 사용하는 이유는 되도록이면 Entity클래스는 철저하게 보호하자는 취지에서 사용한다.
            // CommentEntity는 기본 생성자도 외부에 노출 시키지 말고 어떤생성자도 함부로 노출시키지 말자라는 뜻
            // Entity는 어떻게 보면 DB를 다루는 클래스 객체이기 때문에 DB를 함부로 접근할 수 있다면 큰 문제가 발생할 수 있기 때문이다.
            // CommentEntity commentEntity = new CommentEntity(); 이렇게 객체를 생성하는 것을 막기 위해 사용한다.
            // 이 코드에서는 철저하게 보호하고 있지는 않다
            // 이 부분에서 builder 패턴을 사용하기도 한다 -> 더 보호력이 좋다?

            // 이제 아래부분은 변환해 온것을 저장만 하면 된다.
            return commentRepository.save(commentEntity).getId();   // 저장 후 Id 값 리턴

        } else {    // 없다면
            return null;
        }
    }

    public List<CommentDTO> findAll(Long boardId) {
        // select * from comment_table where board_id = ? order by id desc;
        // 게시글 id를 기준으로 목록 전체를 가져오고 댓글 id 기준으로 내림차순 정렬한다. -> 최신이 먼저오게
        // 이 기능을 구현하려면 메소드 하나를 추가적으로 정의해줘야한다.
        BoardEntity boardEntity = boardRepository.findById(boardId).get();  // DB에서 게시글 아이디로 boardEntity를 가져온다음
        List<CommentEntity> commentEntityList = commentRepository.findAllByBoardEntityOrderByIdDesc(boardEntity);   // 가져온 boardEntity를 이용해서 댓글 목록을 가져온다.
        /* EntityList -> DTOList*/
        List<CommentDTO> commentDTOList = new ArrayList<>();
        for (CommentEntity commentEntity : commentEntityList) {
            CommentDTO commentDTO = CommentDTO.toCommentDTO(commentEntity, boardId);
            commentDTOList.add(commentDTO);
        }
        return commentDTOList;

    }
}
