package com.example.demospring.Controller;

import com.example.demospring.dto.BoardDTO;
import com.example.demospring.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;
    @GetMapping("/save")
    public String saveForm() {
        return "save";
    }
    @PostMapping("/save")
    public String save(@ModelAttribute BoardDTO boardDTO) {
        System.out.println(boardDTO.toString());
        boardService.save(boardDTO);
        return "Home";
    }
    @GetMapping("/")
    public List<BoardDTO> findAll() {
        // DB에서 데이터를 가져와서 리스트로 반환
        return boardService.findAll();
    }
    @GetMapping("/{id}")
    public BoardDTO findById(@PathVariable Long id, Model model) {
        // id를 통해서 데이터를 가져와서 model에 담아서 반환
        // 해당 게시글의 조회수를 하나 올리고
        // 게시글 데이터를 가져와서 detail.html에 출력
        boardService.updateHits(id);
        BoardDTO boardDTO = boardService.findById(id);
        model.addAttribute("board", boardDTO);
        return boardService.findById(id);
    }
}