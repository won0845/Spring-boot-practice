import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

function Detail() {
    const [board, setBoard] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/board/${id}`);
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
    const handleDelete = async () => {
        try {
            await axios.get(`/api/board/delete/${id}`);
            navigate('/board');
        } catch (error) {
            console.error('Error deleting data:', error);
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
                    <td>{new Date(board.boardCreateTime).toLocaleString('en-GB', {timeZone: 'UTC'}).replace(/Z|GMT/g, '')}</td>
                </tr>
                <tr>
                    <th>hits</th>
                    <td>{board.boardHits}</td>
                </tr>
                <tr>
                    <th>contents</th>
                    <td>{board.boardContent}</td>
                </tr>
                {
                    board.fileAttached ? (<tr>
                        <th>Image</th>
                        <td><img src = {`/upload/${board.storedFileName}`} alt=""/></td>
                    </tr>) : null
                }
                </tbody>
            </table>

            <Link to={`/board/paging`}><button>목록</button></Link>
            <Link to={`/board/update/${id}`}><button>수정</button></Link>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
}
export default Detail;


