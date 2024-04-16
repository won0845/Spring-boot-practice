import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useParams, useNavigate} from 'react-router-dom';
import styles from "../components/Container.module.css";
import Input from "../components/Input";
import iStyles from "../components/Input.module.css";
import Button from "../components/Button";

function Update() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [boardUpdate, setBoard] = useState({
        boardWriter: "",
        boardPass: "",
        boardHits: "",});
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [pass, setPass] = useState("");
    const [file, setFile] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/board/update?id=${id}`);
                console.log(response.data)
                setBoard(response.data);
                setTitle(response.data.boardTitle)
                setContents(response.data.boardContent);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleBoardUpdate = async (event) => {
        event.preventDefault(); // 폼의 기본 동작 중지

        const serverPass = boardUpdate.boardPass;

        if (pass === serverPass) {
            await axios.post("/api/board/update",{
                id: id,
                boardWriter: boardUpdate.boardWriter,
                boardPass: pass,
                boardTitle: title,
                boardContent: contents,
                boardHits: boardUpdate.boardHits
            }).then((res) => {
                console.log(res);
                console.log(res.data);
                if(res.data === "Success"){
                    alert("작성되었습니다!");
                    navigate('/', {replace: true}); // 홈으로 이동
                }else{
                    alert("다시 작성해주십시오!");
                }
            }).catch((err)=> {
                console.log(err);
            });
            navigate(`/board/detail/${id}`, {replace: true}); // 상세 페이지로 이동

        } else {
            alert("비밀번호가 일치하지 않습니다!");
        }
    }

    return (

        <div>
            <div className={styles.container}>
                <span className={styles.title}>게시글 수정</span><br/>
                <input type="text" name="boardWriter" value={boardUpdate.boardWriter} readOnly style={{
                    background: 'white', // CSS 속성은 camelCase 사용
                    borderRadius: '10px', // borderRadius도 camelCase
                    marginTop: '10px',
                    color: 'rgba(0, 0, 0, 0.8)',
                    height: '35px',
                    width: '300px',
                    paddingLeft: '10px'
                }}/> <br/>
                <Input type="password" name="boardPass" hold = "비밀번호" onChange={(value) => setPass(value)} /><br/>
                <Input type="text" name="boardTitle" hold = {title} onChange={(value) => setTitle(value)} /><br/>
                <textarea className={iStyles.area} name="boardContent" cols="40" rows="10" value={contents} onChange=
                    {(event) => setContents(event.target.value)}
                ></textarea><br />
                <input type="hidden" name="boardHits" value={boardUpdate.boardHits}/>
                <Input type="file" name="boardFile" onChange={(value) => setFile(value)}/>
                <Button name="Update" name2="수정" onClick={handleBoardUpdate} ></Button>
            </div>

        </div>
    );
}

export default Update;


