package com.example.demospring.dto;

import com.example.demospring.entity.CommentEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class CommentDTO {
    private Long id;
    private String commentWriter;
    private String commentContents;
    private Long boardId;
    private LocalDateTime commentCreatedTime;

    public static CommentDTO toCommentDTO(CommentEntity commentEntity, Long boardId) {  // Entity를 DTO로 변환하는 메소드
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(commentEntity.getId());    //저장소에서 가져온 값을 DTO에 넣어준다.
        commentDTO.setCommentWriter(commentEntity.getCommentWriter());
        commentDTO.setCommentContents(commentEntity.getCommentContents());
        commentDTO.setCommentCreatedTime(commentEntity.getCreatedTime());
        //commentDTO.setBoardId(commentEntity.getBoardEntity().getId());
        // 위의 코드처럼 한다면 service메소드에 @Transactional을 붙여줘야한다.
        // 위의 코드는 게시글의 id를 가져오는 것이다. 이렇게 하거나 아니면 Long boardId을 추가해서 인자로 가져온다.

        commentDTO.setBoardId(boardId);
        return commentDTO;
    }
}
