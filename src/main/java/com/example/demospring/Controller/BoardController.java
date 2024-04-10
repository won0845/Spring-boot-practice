package com.example.demospring.Controller;

import com.example.demospring.dto.BoardDTO;
import com.example.demospring.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        return "index";
    }
}