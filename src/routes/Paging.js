import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

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
        }else if (event.target.innerText === "Last") {
            setCurrentPage(date.boardList.totalPages);
            console.log("Last" + date.boardList.totalPages+ "page 입니다");
        }else {
            setCurrentPage(Number(event.target.innerText));
            console.log(Number(event.target.innerText)+ "page 입니다");
        }
        event.preventDefault();
    }

    useEffect(() => {
        async function fetchData() {
            try {
                console.log(currentPage + "page는 현재 페이지입니다." );
                const response = await axios.get(`/api/board/paging/${currentPage}`);
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
        <div>
            <Link to={`/board/save`} ><button>글작성</button></Link>

            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>writer</th>
                    <th>date</th>
                    <th>hits</th>
                </tr>
                </thead>
                <tbody>
                {boardList.map((board) => (
                    <tr key={board.id}>
                        <td>{board.id}</td>
                        <td>
                            <a href={`/board/${board.id}|page=${boardList.number + 1}`}>{board.boardTitle}</a>
                        </td>
                        <td>{board.boardWriter}</td>
                        <td>{new Date(board.boardCreateTime).toLocaleString('en-GB', {timeZone: 'UTC'}).replace(/Z|GMT/g, '')}</td>
                        <td>{board.boardHits}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={handleSetPage}>First</button>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                <span key={page}>
          {page === boardList.number + 1 ? (
              <span>{page}</span>
          ) : (
              <span onClick={handleSetPage}>{page}</span>
          )}
        </span>
            ))}
            <button onClick={handleSetPage}>Last</button>
        </div>
    );
}
export default Paging;


