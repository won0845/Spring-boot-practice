import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function BoardList() {
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/board/');
                setBoardList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Board List</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>writer</th>
                        <th>dates</th>
                        <th>hits</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map(board => (
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <Link to={`/board/${board.id}`}><td>{board.boardTitle}</td></Link>
                            <td>{board.boardWriter}</td>
                            <td>{new Date(board.boardCreateTime).toLocaleString('en-GB', {timeZone: 'UTC'}).replace(/Z|GMT/g, '')}</td>
                            <td>{board.boardHits}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default BoardList;