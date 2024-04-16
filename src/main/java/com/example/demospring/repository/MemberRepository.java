package com.example.demospring.repository;

import com.example.demospring.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;  //  Optional은 null을 리턴하지 않기 위해 사용한다.

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    // 이메일로 회원 정보 조회 (select * from member_table where email = ?)
    // 특정 쿼리를 수행하기 위해서는 추상메소드를 정의할 수 있는데
    // 규칙만 잘 지켜주면 메서드만 정의해도 맞는 쿼리가 알아서 해준다 -> spring data jpa
    Optional<MemberEntity> findByUserEmail(String email);
}
