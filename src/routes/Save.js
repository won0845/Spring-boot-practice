import React, { useState } from "react";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from '../components/Container.module.css';
import iStyles from '../components/Input.module.css';

function Save() {
    const [writer, setWriter] = useState("");
    const [pass, setPass] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContent] = useState("");
    const [file, setFile] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 방지

        try {
            const formData = new FormData(); // FormData 객체 생성

            // 폼 데이터 FormData에 추가
            formData.append('boardWriter', writer);
            formData.append('boardPass', pass);
            formData.append('boardTitle', title);
            formData.append('boardContent', contents);

            // 파일 업로드 처리
            const fileInput = document.querySelector('input[name="boardFile"]');
            if (fileInput.files && fileInput.files[0]) {
                formData.append('boardFile', fileInput.files[0]);
            }

            const response = await axios.post('/api/board/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // FormData 용 Content-Type 헤더 설정
                },
            });

            // 서버 응답 처리 및 적절한 메시지 표시
            if (response.data === 'Success') {
                alert('글 작성 완료!');
                window.location.href = '/';
            } else {
                alert('글 작성에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error(error);
            alert('글 작성에 오류가 발생했습니다. 관리자에게 문의해주세요.');
        }
    };

    return (
        <div>
            <div className={styles.container}>
            <span className={styles.title}>게시글 작성</span><br/>
            <Input type="text" name="boardWriter" hold = "작성자" onChange={(value) => setWriter(value)} /><br/>
            <Input type="password" name="boardPass" hold = "비밀번호" onChange={(value) => setPass(value)} /><br/>
            <Input type="text" name="boardTitle" hold = "제목" onChange={(value) => setTitle(value)} /><br/>
            <textarea className={iStyles.area} name="boardContent" cols="40" rows="10" value={contents} onChange=
                    {(event) => setContent(event.target.value)}
            ></textarea><br />
            <Input type="file" name="boardFile" onChange={(value) => setFile(value)}/>
            <Button name="Save" name2="저장" onClick={handleSubmit} ></Button>
            </div>
        </div>
    );
}

export default Save;