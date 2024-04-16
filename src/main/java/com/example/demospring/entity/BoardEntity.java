package com.example.demospring.entity;
//DB의 테이블 역할을 하는 클래스

import com.example.demospring.dto.BoardDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "board_table")
public class BoardEntity extends BaseEntity{
    @Id //pk 컬럼 지정 . 필수
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private Long id;

    @Column(length = 20 , nullable = false) // 컬럼크기 20 , not null
    private String BoardWriter;

    @Column // 크기 255, null 가능
    private String BoardPass;

    @Column
    private String BoardTitle;

    @Column(length = 500)
    private String BoardContent;

    @Column
    private int BoardHits;

    @Column
    private int fileAttached; // 첨부 파일 여부(첨부 1, 미첨부 0)
    
    // 부모 테이블인 경우
    @OneToMany(mappedBy = "boardEntity", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.EAGER) // 1:N 관계
    private List<BoardFileEntity> boardFileEntityList = new ArrayList<>();  // 게시글하나 파일 여러개 올 수 있도록 참조관계 설정한다. DB에 리스트 타입으로 설정되는 건아니다.
    // mappedBy ->
    // @JoinColumn(name = "board_id")
    // private BoardEntity boardEntity;
    // BoardFileEntity 에서 boardEntity의 이름이랑 같게 설정한다.

    // 여기서 밑에 boardEntity는 commentEntity에서 참조하는 변수명이다.
    @OneToMany(mappedBy = "boardEntity", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY) // 1:N 관계
    private List<CommentEntity> commentEntityList = new ArrayList<>();  // 게시글하나 댓글 여러개 올 수 있도록 참조관계 설정한다. DB에 리스트 타입으로 설정되는 건아니다.



    public static BoardEntity toSaveEntity(BoardDTO boardDTO, int fileAttached){
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardPass(boardDTO.getBoardPass());
        boardEntity.setBoardTitle(boardDTO.getBoardTitle());
        boardEntity.setBoardContent(boardDTO.getBoardContent());
        boardEntity.setBoardHits(0);
        boardEntity.setFileAttached(fileAttached); // 파일 여부 fileAttached 가 1이면 있고, 0이면 파일이 없는 것이다.
        return boardEntity;
        // 이 작업은 DTO에 담긴 값들을 Entity 객체로 옮겨담는 작업이다.
    }

    public static BoardEntity toUpdateEntity(BoardDTO boardDTO) {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setId(boardDTO.getId());
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardPass(boardDTO.getBoardPass());
        boardEntity.setBoardTitle(boardDTO.getBoardTitle());
        boardEntity.setBoardContent(boardDTO.getBoardContent());
        boardEntity.setBoardHits(boardDTO.getBoardHits());// Entity에서 DTO로 변경
        return boardEntity;
    }
}
