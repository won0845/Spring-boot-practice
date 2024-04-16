import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button";
import {useEffect} from "react";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/user/login`)
    }, []);
    return (
        <div>
            {/*<Link to={`/board/save`}><div>글작성</div></Link>*/}
            {/*<Link to={`/board/paging`}><div>페이징 목록</div></Link>*/}
            {/*<Link to={`/user/signup`}><div>회원 가입</div></Link>*/}
            {/*<Link to={`/user/login`}><div>로그인</div></Link>*/}
        </div>
    );
}

export default Home;