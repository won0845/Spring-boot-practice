import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from 'axios';
function SignUp() {
    const navigate = useNavigate();
    const [userEmail, setEmail] = useState("");
    const [userPW, setPW] = useState("");
    const [userName, setName] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼의 기본 동작 중지
        await axios.post("/api/user/save",{
            //ex) boardWriter: writer,
            userEmail: userEmail,
            userPW: userPW,
            username: userName
        }).then((res) => {
            if(res.data === "Success"){
                alert("회원가입 성공!");
                navigate('/user/login/', {replace: true}); // 홈으로 이동
            }else{
                alert("회원가입 실패! 다시 시도해주십시오!");
            }
        }).catch((err)=> {
            console.log(err);
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Email : <input type="text" name="userEmail" value={userEmail} onChange={event => {
                setEmail(event.target.value)}}/> <br/>
                pw : <input type="password" name="userPW" value={userPW} onChange={event => {
                setPW(event.target.value)}}/> <br/>
                Name : <input type="text" name="userName" value={userName} onChange={event => {
                setName(event.target.value)}}/> <br/>
                <button type="submit">SignUp</button>
            </form>
        </div>
    );
}

export default SignUp;