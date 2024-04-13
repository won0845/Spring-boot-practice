package com.example.demospring.entity;

import com.example.demospring.dto.CommentDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "comment_table")
public class CommentEntity extends BaseEntity{// 시간 관리를 위해 BaseEntity를 상속받는다.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String commentWriter;

    @Column
    private String commentContents;

    //Board의 자식이므로 BoardEntity를 참조하는 관계로 설정해야한다.
    /* Board 와 Comment의 관계는 1:N*/

    @ManyToOne(fetch = FetchType.LAZY)  // 여기는 Comment 기준 이니까 N:1 관계 fetch = FetchType.LAZY : 지연로딩
    @JoinColumn(name = "board_id") // 외래키
    private BoardEntity boardEntity;    // 부모 엔티티 타입 실제로 들어갈땐 아이디로 되어있다.

    public static CommentEntity toSaveEntity(CommentDTO commentDTO , BoardEntity boardEntity) {
        CommentEntity commentEntity = new CommentEntity(); // 여기서는 왜 이렇게 쓰는지 -> 클래스 내부이기 때문에 객체를 만들어서 사용해도된다.
                                                            // 기본생성자를 private으로 막자 내부적으로는 쓸 수 있게끔
        commentEntity.setCommentWriter(commentDTO.getCommentWriter());
        commentEntity.setCommentContents(commentDTO.getCommentContents());
                                                            //자식 데이터를 저장할 때는 부모 Entity가 필요하다.
        commentEntity.setBoardEntity(boardEntity); // 부모 Entity를 넣어준다.
        // 2개가 아닌 외래키도 같이 넣어준다. JPA 문법이라고 생각하면됨
        return commentEntity;
    }
}
