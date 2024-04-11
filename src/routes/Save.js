import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from 'axios';
function Save() {
    const navigate = useNavigate();
    const [Writer, setWriter] = useState("");
    const [Pass, setPass] = useState("");
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");

    // const handleSubmit = (event) => {
    //     event.preventDefault(); // 폼의 기본 동작 중지
    //     console.log(Writer, Pass, Title, Content);
    //     console.log("버튼 저장 실행")
    //     axios.post('/api/board/save', {
    //         boardWriter: Writer,
    //         boardPass: Pass,
    //         boardTitle: Title,
    //         boardContent: Content
    //     })
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //
    //     navigate('/', {replace: true}); // 홈으로 이동
    // };
    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼의 기본 동작 중지
        console.log(Writer, Pass, Title, Content);
        console.log("버튼 저장 실행")
        await axios.post("/api/board/save",{
            boardWriter: Writer,
            boardPass: Pass,
            boardTitle: Title,
            boardContent: Content
        }).then((res) => {
            console.log(res);
            console.log(res.data);
            if(res.data === "Success"){
                alert("작성되었습니다!");
                navigate('/', {replace: true}); // 홈으로 이동
            }else{
                alert("다시 작성해주십시오!");
            }
        }).catch((err)=> {
            console.log(err);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Writer : <input type="text" name="boardWriter" value={Writer} onChange={event => {
                setWriter(event.target.value)
            }}/> <br/>
                pw : <input type="password" name="boardPass" value={Pass} onChange={event => {
                setPass(event.target.value)
            }}/> <br/>
                Title : <input type="text" name="boardTitle" value={Title} onChange={event => {
                setTitle(event.target.value)
            }}/> <br/>
                Content : <textarea name="boardContent" cols="30" rows="10" value={Content} onChange={event => {
                setContent(event.target.value)
            }}></textarea> <br/>
                <button type="submit" value="Save"/>
            </form>
        </div>
    );
}

export default Save;