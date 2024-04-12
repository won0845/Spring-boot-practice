package com.example.demospring.dto;

import com.example.demospring.entity.BoardEntity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

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

    private MultipartFile boardFile;    // save.html -> Controller 파일 담는 용도
    private  String originalFileName;   // 원본 파일 이름
    private  String storedFileName;     // 서버 저장용 파일 이름
    private int fileAttached;             // 첨부 파일 여부(첨부 1, 미첨부 0)

    public BoardDTO(Long id, String boardWriter, String boardTitle, int boardHits, LocalDateTime boardCreateTime) {
        this.id = id;
        this.boardWriter = boardWriter;
        this.boardTitle = boardTitle;
        this.boardHits = boardHits;
        this.boardCreateTime = boardCreateTime;
    }

    public static BoardDTO toBoardDTO(BoardEntity boardEntity) {
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setId(boardEntity.getId());
        boardDTO.setBoardWriter(boardEntity.getBoardWriter());
        boardDTO.setBoardPass(boardEntity.getBoardPass());
        boardDTO.setBoardTitle(boardEntity.getBoardTitle());
        boardDTO.setBoardContent(boardEntity.getBoardContent());
        boardDTO.setBoardHits(boardEntity.getBoardHits());
        boardDTO.setBoardCreateTime(boardEntity.getCreatedTime());
        boardDTO.setBoardUpdateTime(boardEntity.getUpdatedTime());
        if (boardEntity.getFileAttached() == 0 ){
            boardDTO.setFileAttached(0);   //0 파일이 없다.
        } else {
            boardDTO.setFileAttached(boardEntity.getFileAttached());   //1 파일이 있다.
            // 파일 이름을 가져가야한다.
            // orginalFileName, storedFileName : board_file_table(BoardFileEntity)에 저장된 파일 이름
            // join
            // select * from board_table b, board_file_table f where b.id = f.board_id and b.id = ?;
            boardDTO.setOriginalFileName(boardEntity.getBoardFileEntityList().get(0).getOriginalFileName());
            // 엔티티에 있는 파일리스트에서 첫번째 파일의 이름을 가져온다. -> 파일이 하나만 있는 경우
            boardDTO.setStoredFileName(boardEntity.getBoardFileEntityList().get(0).getStoredFileName());    // 실제 활용하지않지만 쓸 수 있으니까 가져온다.
        }
        return boardDTO;
    }
}
