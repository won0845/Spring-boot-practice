package com.example.demospring.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDTO {
    // 필드로 정의 private 으로 감춘다.
    // 필드를 사용하기위해서는 getter setter가 필요하다.
    // lombok을 사용하면 getter setter를 자동으로 만들어준다.
    private Long id;
    private String username;
    private String userPW;
    private String userEmail;
}
