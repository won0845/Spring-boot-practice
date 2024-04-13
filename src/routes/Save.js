import { useState } from "react";
import axios from "axios";

function Save() {
    const [writer, setWriter] = useState("");
    const [pass, setPass] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContent] = useState("");

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
            <form onSubmit={handleSubmit}>
                Writer:{" "}
                <input type="text" name="boardWriter" value={writer} onChange=
                    {(event) => setWriter(event.target.value)}
                />
                <br />
                pw:{" "}
                <input type="password" name="boardPass" value={pass} onChange=
                    {(event) => setPass(event.target.value)}
                />
                <br />
                Title:{" "}
                <input
                    type="text" name="boardTitle" value={title} onChange=
                    {(event) => setTitle(event.target.value)}
                />
                <br />
                Content:{" "}
                <textarea name="boardContent" cols="30" rows="10" value={contents} onChange=
                    {(event) => setContent(event.target.value)}
                ></textarea>
                <br />
                File:{" "}
                <input type="file" name="boardFile" />  
                {/*// mulitple 추가시 파일 여러개 업로드 가능*/}
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Save;