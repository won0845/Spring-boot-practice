import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <Link to={`/board/save`}><div>글작성</div></Link>
            <Link to={`/board`}><div>글목록</div></Link>
        </div>
    );
}

export default Home;