package com.example.demospring.service;

import com.example.demospring.dto.UserDTO;
import com.example.demospring.entity.MemberEntity;
import com.example.demospring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service    // spring이 bean을 자동으로 등록
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    public void save(UserDTO userDTO) {

        MemberEntity memberEntity = MemberEntity.toMemberEntity(userDTO);
        memberRepository.save(memberEntity); //여기서 save는 우리가 만드는게 아니고 Repository에 있는 save를 사용하는 것이다.
                                            // jpa가 제공하는 save를 사용하는 것이다.
                                            // service save는 이름을 지정해도 되지만 repo.save는 이름을 지정하면 안된다.
        // 1. DTO -> Entity 변환 -> 방식 여러가지
        // 2. Repository save 호출
        // Repository의 save 메소드를 호출한다. ( 조건 : DTO -> Entity 변환 )
        //

    }

    public UserDTO login(UserDTO userDTO) {
        /*
         * 1. 회원이 입력한 이메일로 DB에서 조회를 한다.
         * 2. DB에서 조회한 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 판단한다.
         * 요즘이렇게 짜면 안된다...
         */
    }
}
