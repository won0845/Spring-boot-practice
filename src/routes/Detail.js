import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';

function Detail() {
    const [board, setBoard] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/board/${id}`);
                console.log(response.data)
                setBoard(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    async function commentWrite() {
        try {
            // 댓글 작성 처리
            // axios.post('/comment/write', { writer: commentWriter, contents: commentContents });
            // 댓글 작성 후 commentList 업데이트
            // fetchData(); // 혹은 댓글 데이터 따로 처리
        } catch (error) {
            console.error('Error writing comment:', error);
        }
    }

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <th>id</th>
                    <td>{board.id}</td>
                </tr>
                <tr>
                    <th>title</th>
                    <td>{board.boardTitle}</td>
                </tr>
                <tr>
                    <th>writer</th>
                    <td>{board.boardWriter}</td>
                </tr>
                <tr>
                    <th>date</th>
                    <td>{board.boardCreatedTime}</td>
                </tr>
                <tr>
                    <th>hits</th>
                    <td>{board.boardHits}</td>
                </tr>
                <tr>
                    <th>contents</th>
                    <td>{board.boardContents}</td>
                </tr>
                </tbody>
            </table>

            <Link to={`/board/`}><button>목록</button></Link>
            <Link to={`/board/update`}><button>수정</button></Link>
            <Link to={`/board/delete`}><button>삭제</button></Link>
        </div>
    );
}
export default Detail;


