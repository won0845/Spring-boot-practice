## 개발환경
1. IDE : IntelliJ IDEA Ultimate 23.2.3
2. Spring boot 3.2.4
3. jdk 17
4. mysql
5. Spring data JPA
6. Thymeleaf

## 게시판 주요기능
1. 글쓰기(/borad/save)
2. 글목록(/board/)
3. 글조회(/board/{id})
4. 글수정(/board/update/{id}/)
5. 글삭제(/board/delete/{id})
6. 페이징 처리(/board/paging)
    - /board/paging?page=1&size=10
    - /board/paging/2 ?
    - 위에처럼하지 않는 이유는 아이디는 항상 그것을 가르키는데 
    - 페이지는 오늘페이지와 내일페이지는 그때그때 다르기 때문에
    - REST API는 주소만으로 자원을 식별하자는 뜻
7. 파일 업로드(/board/upload)
   - save.html
   - BoardDTO
   - BoardService.save()
   - BoardEntity
   - BoardFileEntity, BoardFileRepository 추가
   - detail
   파일은 DB에 저장되는 것은 아니고 서버에 저장된다.
   DB에는 파일의 이름만 저장된다.
8. 댓글 처리하기
   - 글 상세 페이지에 댓글 입력(ajax-> axios)
   - 상세 조회시 기존에 작성된 댓글 목록이 보인다.
   - 댓글을 입력하면 기존 댓글 목록에 새로 작성한 댓글 추가
   - 댓글용 테이블 추가

수정후 조회수 합치는 기능 추가 예정

목록으로 되돌아갈때 현재 페이지 위치 기억하기기능 일단 못 받아옴 일단 기능 추가해보기?


## 게시판 테이블 생성
```
CREATE TABLE board_table (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_date datetime null,
    updated_date datetime null,
    board_contents varchar(500) null, 
    board_password varchar(255) null,
    board_title VARCHAR(255) NULL,
    board_writer VARCHAR(20) NOT NULL,
   file_attached int NULL 
);

CREATE TABLE board_file_table (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_date datetime null,
    updated_date datetime null,
    original_file_name varchar(255) null,
    stored_file_name varchar(255) null,
    board_id BIGINT NULL,
    FOREIGN KEY (board_id) REFERENCES board_table(id) on delete cascade // 부모데이터 삭제되면 자식 데이터도 같이 삭제된다.
);
```
