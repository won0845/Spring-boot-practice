package com.example.demospring.repository;

import com.example.demospring.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    // update board_table set board_hits = board_hits + 1 where id = ?
    @Modifying
    @Query("update BoardEntity b set b.BoardHits = b.BoardHits + 1 where b.id = :id")
    void updateHits(@Param("id") Long id);
}
