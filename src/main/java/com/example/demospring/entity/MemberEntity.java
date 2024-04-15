package com.example.demospring.entity;

import com.example.demospring.dto.UserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "member_table")
public class MemberEntity {
    @Id // Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동증가
    private Long id;

    @Column(unique = true) // unique 제약조건 추가 중복 불가능?
    private String userEmail;

    @Column
    private String userPW;

    @Column
    private String username;

    public static MemberEntity toMemberEntity(UserDTO userDTO){
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setUserEmail(userDTO.getUserEmail());
        memberEntity.setUserPW(userDTO.getUserPW());
        memberEntity.setUsername(userDTO.getUsername());
        return memberEntity;
    }
}
