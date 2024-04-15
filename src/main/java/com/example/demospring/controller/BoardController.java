package com.example.demospring.controller;

import com.example.demospring.dto.BoardDTO;
import com.example.demospring.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
@CrossOrigin(origins = "http://localhost:3000") // 특정 출처 허용
public class BoardController {
    private final BoardService boardService;
    @GetMapping("/save")
    public String saveForm() {
        return "save";
    }
    @PostMapping("/save")
    public String save(@ModelAttribute BoardDTO boardDTO) throws IOException {
        System.out.println("api/board/save실행 user 로 부터 받아온 데이터"+boardDTO.toString());
        boardService.save(boardDTO);
        return "Success";
    }
    @GetMapping("/")
    public List<BoardDTO> findAll() {
        // DB에서 데이터를 가져와서 리스트로 반환
        return boardService.findAll();
    }
    @GetMapping("/detail")
    public BoardDTO findById(@RequestParam("id") Long id) {
        System.out.println("api/board/detail실행 user 로 부터 받아온 데이터"+id.toString());
        // id를 통해서 데이터를 가져와서 model에 담아서 반환
        // 해당 게시글의 조회수를 하나 올리고
        // 게시글 데이터를 가져와서 detail.html에 출력
        boardService.updateHits(id);
        return boardService.findById(id);
    }

    @GetMapping("/update")
    public BoardDTO updateForm(@RequestParam("id") Long id) {
        // id를 통해서 데이터를 가져와서 model에 담아서 반환
        // 일단은 id에 대한 정보를 가져와서 update에서 보여줌
        return boardService.findById(id);
    }

    @PostMapping("/update")
    public String update(@RequestBody BoardDTO boardDTO, Model model){
        System.out.println("api/board/update실행 user 로 부터 받아온 데이터"+boardDTO.toString());
        // updateForm에서 받아온 데이터를 저장
        BoardDTO board = boardService.update(boardDTO);
        model.addAttribute("board", board);
        return "Success";
    }
    @GetMapping("/delete")
    public String delete(@RequestParam("id") Long id) {
        boardService.delete(id);
        // id를 통해서 데이터를 삭제
        return "Success";
    }
    // /board/paging?page=1&size=10
    @GetMapping("/paging")
    public Map<String, Object> paging(@PageableDefault Pageable pageable,@RequestParam("currentPage") Long currentPage){
        System.out.println("page"+ currentPage +" 요청 받음");
        pageable.getPageNumber();
        pageable = PageRequest.of(currentPage.intValue(), pageable.getPageSize()); // currentPage를 적용하여 새로운 pageable 객체 생성
        System.out.println("page"+ pageable.getPageNumber() +" 현재 페이지입니다");
        Page<BoardDTO> boardList = boardService.paging(pageable);
        int blockLimit = 5;     // 한 페이지에 몇개의 페이지를 보여줄지
        int startPage = (((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;    // 시작 페이지 7, 8, 9 페이지가 화면에 나타난다면 7페이지가 시작페이지가 된다.1,4,7,10 값이 나온다
        int endPage = Math.min((startPage + blockLimit - 1), boardList.getTotalPages()); // 3,6, 9, 12 페이지가 화면에 나타난다면 9페이지가 끝페이지가 된다.
        // 총페이지 갯수가 9개라면 8개 까지만 보여주면 된다. -> 총페이지가 큰경우 9를 보여주고 작은경우 8을 보여준다.
        // page 갯수 20개 라면?
        // 현재 사용자가 3페이지를 본다고 하면
        // 1 2 3 4 5 에서 3 페이지는 표시가 되어있고 링크는 되어있지 않다.
        // 보여지는 페이지 개수 1,2,3,4,5,6까지 보여지게 한다.

        Map<String, Object> paginationInfo = new HashMap<>();
        paginationInfo.put("boardList", boardList);
        paginationInfo.put("blockLimit", blockLimit);
        paginationInfo.put("startPage", startPage);
        paginationInfo.put("endPage", endPage);

        return paginationInfo;
    }

}