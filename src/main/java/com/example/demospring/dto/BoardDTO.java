package com.example.demospring.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

//DTO (Data Transfer Object) : 데이터 전송 객체 -> VO, Bean 등으로 불리기도 함 구체적으로 차이는있음, Entity는 목적이 다르다.
@Getter
@Setter
@ToString
@NoArgsConstructor  //기본생성자
@AllArgsConstructor //모든 필드를 매개변수로 받는 생성자
public class BoardDTO {
    private Long id;
    private String boardWriter;
    private String boardPass;
    private String boardTitle;
    private String boardContent;
    private int boardHits;  // 조회수
    private LocalDateTime boardCreateTime;  //작성시간
    private LocalDateTime boardUpdateTime;  //수정시간
}
