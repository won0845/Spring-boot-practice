import {Link } from "react-router-dom";
function Home() {
    return (
        <div>
            <Link to={`/board/`}>THIS IS HOME</Link>
        </div>
    );
}
export default Home;