import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import styles from '../components/Container.module.css';

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
            <div className={styles.detailContainer}>
                <div className={styles.detailBox}>
                    <div className={styles.detailTitle}>
                        <span className={styles.detailSpanticleTitle}>{board.boardTitle}</span><br/>
                        <span className={styles.spanticleContent}>조회수 {board.boardHits}</span><br/>
                    </div>
                    <div className={styles.detailName}>
                        <span className={styles.spanticleTitle}>{board.boardWriter}</span><br/>
                        <span className={styles.spanticleContent}>{new Date(board.boardCreateTime).toLocaleString('en-GB', {timeZone: 'UTC'}).
                        replace(/Z|GMT/g, '')}</span><br/>
                    </div>
                </div>
                {board.fileAttached ? (<img className={styles.detailImg} src = {`/upload/${board.storedFileName}`} alt=""/>)
                    : null}
                <div className={styles.detailContentBox}>
                <span className={styles.spanticleContent}>{board.boardContent}</span><br/>
                </div>
            </div>



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


