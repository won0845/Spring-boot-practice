package com.example.demospring.repository;

import com.example.demospring.entity.BoardEntity;
import com.example.demospring.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Long>{
    // id를 외래키로 해줬으니 BoardEntity를 넣어주면 된다.
    List<CommentEntity> findAllByBoardEntityOrderByIdDesc(BoardEntity boardEntity); //메소드 이름을 기준으로 쿼리가 자동으로 생성된다??


}
