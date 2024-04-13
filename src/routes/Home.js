import {Link} from "react-router-dom";
import Button from "../components/Button";

function Home() {
    return (
        <div>
            <Link to={`/board/save`}><div>글작성</div></Link>
            <Link to={`/board`}><div>글목록</div></Link>
            <Link to={`/board/paging`}><div>페이징 목록</div></Link>
            <Button name ="버튼"></Button>
        </div>
    );
}

export default Home;