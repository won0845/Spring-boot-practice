package com.example.demospring.entity;
//DB의 테이블 역할을 하는 클래스

import com.example.demospring.dto.BoardDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    public static BoardEntity toSaveEntity(BoardDTO boardDTO){
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardPass(boardDTO.getBoardPass());
        boardEntity.setBoardTitle(boardDTO.getBoardTitle());
        boardEntity.setBoardContent(boardDTO.getBoardContent());
        boardEntity.setBoardHits(0);
        return boardEntity;
        // 이 작업은 DTO에 담긴 값들을 Entity 객체로 옮겨담는 작업이다.
    }

}
