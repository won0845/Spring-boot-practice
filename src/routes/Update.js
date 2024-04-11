import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useParams, useNavigate} from 'react-router-dom';

function Update() {

    const {id} = useParams();
    const [boardUpdate, setBoard] = useState([]);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/board/update/${id}`);
                console.log(response.data)
                setBoard(response.data);
                setTitle(response.data.boardTitle)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleBoardUpdate = (event) => {
        event.preventDefault(); // 폼의 기본 동작 중지

        const pass = boardUpdate.boardPass;
        const inputPass = document.getElementById("boardPass").value;

        if (pass === inputPass) {
            alert("수정 완료!");
            navigate(`/board/${id}`, {replace: true}); // 상세 페이지로 이동

        } else {
            alert("비밀번호가 일치하지 않습니다!");
        }
    }

    return (
        <div>
            <form action="/api/board/update" onSubmit={handleBoardUpdate} id="updateForm" name="updateForm">
                <input type="hidden" name="id" value={boardUpdate.id}/>

                <label htmlFor="boardWriter">writer: </label>
                <input type="text" name="boardWriter" value={boardUpdate.boardWriter} readOnly/> <br/>

                <label htmlFor="boardPass">pass: </label>
                <input type="text" name="boardPass" id="boardPass"/> <br/>

                <label htmlFor="boardTitle">title: </label>
                <input type="text" name="boardTitle"  value={title} onChange={event=> {
                    setTitle(event.target.value)
                }}/> <br/>

                <label htmlFor="boardContents">contents: </label>
                <textarea name="boardContents" value={contents} onChange={event => {
                    setContents(event.target.value)}} cols="30" rows="10"></textarea> <br/>

                <input type="hidden" name="boardHits" value={boardUpdate.boardHits}/>
                <input type="submit" value="글수정"/>
            </form>
        </div>
    );
}

export default Update;


