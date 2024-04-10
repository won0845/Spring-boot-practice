package com.example.demospring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public class BaseEntity {
    @CreationTimestamp      //생성되었을 때 자동으로 시간을 넣어줌
    @Column(updatable = false)  // 수정시에 관여를 하지 않는다.
    private LocalDateTime createdTime;

    @UpdateTimestamp        // 업데이트 발생시 자동으로 시간을 넣어줘
    @Column(insertable = false) // 입력시에 관여를 하지 않는다.
    private LocalDateTime updatedTime;
}

//이렇게 따로 만들어 주는 이유는 다른 곳에서도 시간정보를 사용하기 때문에 여러 곳에 쓰려고 따로 만들어준다.