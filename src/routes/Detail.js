import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

function Detail() {
    const [board, setBoard] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [commentWriter, setCommentWriter] = useState("");
    const [commentContents, setCommentContents] = useState("");
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/board/detail?id=${id}`);
                const response2 = await axios.get(`/api/comment/printComment?id=${id}`);
                console.log(response2.data)
                setCommentList(response2.data)
                console.log(response.data)
                setBoard(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    async function commentWrite() {
            // 댓글 작성 처리
            // axios.post('/comment/write', { writer: commentWriter, contents: commentContents });
            // 댓글 작성 후 commentList 업데이트
            // fetchData(); // 혹은 댓글 데이터 따로 처리
            console.log(commentWriter, commentContents);
            await axios.post("/api/comment/saveComment", {
                boardId:id,
                commentWriter: commentWriter,
                commentContents: commentContents
            }).then((res) => {
                console.log(res);
                setCommentList(res.data);
                setCommentWriter("");
                setCommentContents("");
                //navigate('/', {replace: true}); // 홈으로 이동
            }).catch((err)=> {
                console.log(err);
            });

    }
    const handleDelete = async () => {
        try {
            await axios.get(`/api/board/delete?id=${id}`);
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

            {/*댓글 작성부분*/}
            <div id="commentWrite">
                <input type="text" id="commentWriter" placeholder="작성자" value={commentWriter} onChange={event => {
                    setCommentWriter(event.target.value)}}/>
                <input type="text" id="commentContents" placeholder="내용" value={commentContents} onChange={event => {
                    setCommentContents(event.target.value)}}/>
                <button onClick={commentWrite}>댓글 작성</button>

            </div>
            {/*댓글 출력부분*/}
            <div id="commentList">
                <table>
                    <thead>
                    <tr>
                        <th>댓글 번호</th>
                        <th>작성자</th>
                        <th>내용</th>
                        <th>작성시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {commentList.map(comment => (
                        <tr key={comment.id}>
                            <td>{comment.id}</td>
                            <td>{comment.commentWriter}</td>
                            <td>{comment.commentContents}</td>
                            <td>{comment.boardId}</td>
                            <td>{new Date(comment.commentCreatedTime).toLocaleString('en-GB', {timeZone: 'UTC'}).replace(/Z|GMT/g, '')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Detail;


