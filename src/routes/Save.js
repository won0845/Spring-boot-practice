import { Link, useNavigate } from "react-router-dom";
function Save() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 제출 동작 방지

        navigate('/',{replace:true}); // 홈으로 이동
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Writer : <input type="text" name="boardWriter" /> <br/>
                pw : <input type="password" name="boardPass" /> <br/>
                Title : <input type="text" name="boardTitle" /> <br/>
                Content : <textarea name="boardContent" cols="30" rows="10"></textarea> <br/>
                <input type="submit" value="Save" />
            </form>
        </div>
    );
}

export default Save;