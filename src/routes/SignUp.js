import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from 'axios';
import Input from "../components/Input";
import styles from "../components/Container.module.css";
import Button from "../components/Button";

function SignUp() {
    const navigate = useNavigate();
    const [userEmail, setEmail] = useState("");
    const [userPW, setPW] = useState("");
    const [userPWConfirm, setPWConfirm] = useState("");
    const [userName, setName] = useState("");

    const emailCheck = async () => {
        const emailResult = document.getElementById("checkResult");
        emailResult.style.display = "block";
        const email = userEmail;
        const emailForm = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (email.match(emailForm)) {
            await axios.post("/api/user/check", {
                //ex) boardWriter: writer,
                userEmail: userEmail
            }).then((res) => {
                if (res.data === "ok") {
                    emailResult.innerHTML = "사용가능한 이메일입니다."
                    emailResult.style.color = "blue";
                } else {
                    emailResult.innerHTML = "이미 사용중인 이메일입니다."
                    emailResult.style.color = "red";
                }
            }).catch((err) => {
                console.log(err);
            });

        }else{
            emailResult.innerHTML = "이메일 형식이 아닙니다."
            emailResult.style.color = "red";
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼의 기본 동작 중지
        if(userEmail === ""){
            alert("이메일을 입력해주세요");
            return;
        }if(userPW === ""){
            alert("Password을 입력해주세요");
            return;
        }
        if (userPW !== userPWConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }if(userName === ""){
            alert("이름을 입력해주세요");
            return;
        }
        await axios.post("/api/user/save", {
            //ex) boardWriter: writer,
            userEmail: userEmail,
            userPW: userPW,
            username: userName
        }).then((res) => {
            if (res.data === "Success") {
                alert("회원가입 성공!");
                navigate('/user/login/', {replace: true}); // 홈으로 이동
            } else {
                alert("회원가입 실패! 다시 시도해주십시오!");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    const handleCancel = (event) =>{
        event.preventDefault(); // 폼의 기본 동작 중지
        navigate('/user/login/', {replace: true});
    }
    return (
        <div>
        <div className={styles.container}>
            <span className={styles.title}>SignUp</span><br/>
            <Input type="text" name="userEmail" hold = "Email" onBlur= {emailCheck} onChange={(value) => setEmail(value)}/><br/>
            <span id="checkResult" className={styles.check} style={{ display: "none"}} ></span>
            <Input type="password" name="userPW" hold = "Password" onChange={(value) => setPW(value)}/><br/>
            <Input type="password" name="userPWconfirm" hold = "Password Confirm" onChange={(value) => setPWConfirm(value)}/><br/>
            <Input type="text" name="userName" hold = "Name" onChange={(value) => setName(value)}/><br/>

        {/*    Email : <input type="text" name="userEmail" value={userEmail} onChange={event => {*/}
        {/*    setEmail(event.target.value)*/}
        {/*}} onBlur={emailCheck}/> <br/> /!* 클릭으로 중복체크 해도됨 onKeyUp을 사용하면 서버 간의 통신이 잦을것 같음*!/*/}
        {/*    <span id="checkResult"></span> <br/>*/}
        {/*    pw : <input type="password" name="userPW" value={userPW} onChange={event => {*/}
        {/*    setPW(event.target.value)*/}
        {/*}}/> <br/>*/}
        {/*    Name : <input type="text" name="userName" value={userName} onChange={event => {*/}
        {/*    setName(event.target.value)*/}
        {/*}}/> <br/>*/}
            <div className={styles.buttonContainer}>
            <Button name="SignUp" name2="Up" onClick={handleSubmit} ></Button>
            <Button name="Cancel" name2="X" onClick={handleCancel} ></Button>
            </div>
            {/*<button type="button" onClick={handleSubmit}>SignUp</button>*/}
        </div>
        </div>

    );
}

export default SignUp;