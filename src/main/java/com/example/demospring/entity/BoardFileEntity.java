package com.example.demospring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "board_file_table")
public class BoardFileEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String originalFileName;

    @Column
    private String storedFileName;

    //게시글과 파일의 관계는 1:N 관계이다.

    // 자식 테이블인 경우
    @ManyToOne(fetch = FetchType.LAZY)  //파일을 기준으로 게시글과 N:1 관계  , 
    // FetchType.LAZY : 지연로딩->
    // FetchType.EAGER : 즉시로딩 자식들을 다가져옴
    @JoinColumn(name = "board_id") // 외래키
    private BoardEntity boardEntity;    //부모 엔티티 타입 실제로 들어갈땐 아이디로 되어있다.

    public static BoardFileEntity toBoardFileEntity(BoardEntity boardEntity, String originalFileName, String storedFileName){
        BoardFileEntity boardFileEntity = new BoardFileEntity();
        boardFileEntity.setOriginalFileName(originalFileName);
        boardFileEntity.setStoredFileName(storedFileName);
        boardFileEntity.setBoardEntity(boardEntity);    //pk값이 아닌 부모 Entity를 넣어준다.
        return boardFileEntity;
    }
}
