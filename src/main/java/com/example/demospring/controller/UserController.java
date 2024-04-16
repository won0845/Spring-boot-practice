package com.example.demospring.controller;

import com.example.demospring.dto.UserDTO;
import com.example.demospring.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000") // 특정 출처 허용
public class UserController {
    private final MemberService memberService;  // 여기서 final로 하지않는다면 ???
    @PostMapping("/save")
    public String save(@RequestBody UserDTO userDTO){
        memberService.save(userDTO);
        System.out.println(userDTO + "/save in" );
        return "Success";
    }
    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO, HttpSession session){
        System.out.println(userDTO);
        UserDTO loginResult = memberService.login(userDTO);
        if (loginResult != null){
            //login 성공
            session.setAttribute("loginEmail", loginResult.getUserEmail());
            return "Success";
        }else{
            return "loginPage";
        }
    }
    @PostMapping("/check")
    public @ResponseBody String login(@RequestBody UserDTO userDTO){
        String userEmail = userDTO.getUserEmail();
        return memberService.emailCheck(userEmail);
    }



//    @GetMapping("/")
//    public String index(){
//        return "index"; //=> templates 폴더의 index.html 을 찾아라?
//                        // -> templates 지금 비어있는데 한번 넣어서 확인해보기?
//                        // -> 3000에서 요청하는게 아닌ㄷ 8080에서 실행했을 때 기준? build 했을 때 는 이렇게 하나?
//    }
}


