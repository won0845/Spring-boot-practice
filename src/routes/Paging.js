import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import styles from '../components/Container.module.css';
import btnStyles from '../components/Button.module.css';

function Paging() {
    const [date, setDate] = useState([]);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    const [blockLimit, setBlockLimit] = useState(5);
    const [boardList, setBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handleSetPage = (event) => {
        if (event.target.innerText === "First") {
            setCurrentPage(1);
            console.log("First" + "입니다");
        } else if (event.target.innerText === "Last") {
            setCurrentPage(date.boardList.totalPages);
            console.log("Last" + date.boardList.totalPages + "page 입니다");
        } else {
            setCurrentPage(Number(event.target.innerText));
            console.log(Number(event.target.innerText) + "page 입니다");
        }
        event.preventDefault();
    }
    const clickArt = (id) => {
        navigate(`/board/detail/${id}`, {replace: true});
    }

    useEffect(() => {
        async function fetchData() {
            try {
                console.log(currentPage + "page는 현재 페이지입니다.");
                const response = await axios.get(`http://localhost:8080/api/board/paging?currentPage=${currentPage}`);
                console.log(response.data)
                setDate(response.data);
                setBoardList(response.data.boardList.content);
                setStartPage(response.data.startPage);
                setEndPage(response.data.endPage);
                setBlockLimit(response.data.blockLimit);
            } catch (error) {
                console.error('Error 발생 data:', error);
            }
        }

        fetchData();
    }, [currentPage]);


    return (
        <div className={styles.scroll}>


            <div className={styles.articleBox}>
                <span className={styles.title}>Board</span>
                <button className={btnStyles.plus} onClick={() => navigate(`/board/save`)}>+</button>
                {boardList.map((board) => (
                    <div key={board.id} className={styles.articleContainer} onClick={() => clickArt(board.id)}>
                        <div className={styles.imgContainer}>
                            <img id="imgBox" src={`/upload/${board.storedFileName}`} alt=""/>
                        </div>
                        <div className={styles.article}>
                            <span className={styles.spanticleTitle}>{board.boardTitle}</span><br/>
                            <span className={styles.spanticleContent}>작성자&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;{board.boardWriter}</span><br/>
                            <span className={styles.spanticleContent}>작성시간 &nbsp;&nbsp;: &nbsp;&nbsp;{new Date(board.boardCreateTime).toLocaleString('en-GB', {timeZone: 'UTC'})}</span><br/>
                            <span className={styles.spanticleContent}>조회수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;{board.boardHits}</span><br/>
                            <span className={styles.spanticleContent}>{board.boardContent.length > 50 ? board.boardContent.substring(0, 50) + "..." : board.boardContent}
                            </span>
                        </div>
                    </div>
                ))}
            </div>


            {/*<table>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>id</th>*/}
            {/*        <th>title</th>*/}
            {/*        <th>writer</th>*/}
            {/*        <th>date</th>*/}
            {/*        <th>hits</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {boardList.map((board) => (*/}
            {/*        <tr key={board.id}>*/}
            {/*            <td>{board.id}</td>*/}
            {/*            <td><Link to={`/board/detail/${board.id}`}>{board.boardTitle}</Link></td>*/}
            {/*            <td>{board.boardWriter}</td>*/}
            {/*            <td>{new Date(board.boardCreateTime).toLocaleString('en-GB', {timeZone: 'UTC'}).replace(/Z|GMT/g, '')}</td>*/}
            {/*            <td>{board.boardHits}</td>*/}
            {/*            <td><img src = {`/upload/${board.storedFileName}`} alt=""/></td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
            <div className={styles.pagingNav}>
                <button className={btnStyles.navButton} onClick={handleSetPage} style={{float:'left'}}>First</button>
                {Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i).map((page) => (
                    <span key={page}>
          {page === boardList.number + 1 ? (
              <span className={styles.pageButton}>{page}</span>
          ) : (
              <span className={styles.pageButton} onClick={handleSetPage}>{page}</span>
          )}
        </span>
                ))}
                <button className={btnStyles.navButton} onClick={handleSetPage} style={{float:'right'}}>Last</button>
            </div>
        </div>
    );
}

export default Paging;


