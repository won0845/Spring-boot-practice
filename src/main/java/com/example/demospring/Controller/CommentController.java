package com.example.demospring.Controller;

import com.example.demospring.dto.CommentDTO;
import com.example.demospring.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment") // comment로 시작하는 URL은 이 컨트롤러로 매핑
@CrossOrigin(origins = "http://localhost:3000") // 특정 출처 허용
public class CommentController {
    private final CommentService commentService;
    @PostMapping("/saveComment") // POST 방식으로 /comment/save로 요청이 들어오면 이 메소드가 실행
    public ResponseEntity save(@RequestBody CommentDTO commentDTO) {    // @RequestBody, @ResponseBody 두개 차이점??
        // @ModelAttribute: 요청 파라미터를 CommentDTO 객체에 바인딩
        // ajax 요청이므로 @ResponseBody를 사용하여 문자열을 반환
        // CommentDTO 객체를 받아서 처리하는 코드
        System.out.println(commentDTO);
        Long saveResult = commentService.save(commentDTO);
        if(saveResult != null) {
            // 작성 성공후 save가 종료되면 안된다.
            // 댓글을 작성하면은 기존댓글에 새로작성된 댓글을 더한 목록을 다시 보여줘야한다.
            // 추가만 하면 되지 않느냐라고 하는데 다시 전체 댓글을 가지고 와서 그것을 화면에서 반복문 형태로 보여줘야한다.
            // 위에 처럼하면 훨씬 다루기가 쉬울 것이다.

            //작성 성공하면 댓글 목록을 가져와서 리턴
            // 댓글 목록: 해당 게시글의 댓글 전체
            // 해당 게시글의 id를 기준으로 다 가져와야한다. 그러므로 getBoardId()를 사용한다.
            List<CommentDTO> commentDTOList = commentService.findAll(commentDTO.getBoardId());
            return new ResponseEntity<>(commentDTOList, HttpStatus.OK); //Entity는 body와 header를 다룰 수 있는 객체다. body와 상태코드를 같이 보낼 수 있다.
        }
        else{
            //return "Fail"; // 댓글을 저장하지 못한 경우
            return new ResponseEntity<>("실패",HttpStatus.NOT_FOUND);
        }
    }
}


