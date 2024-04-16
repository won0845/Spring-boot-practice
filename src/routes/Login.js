import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from 'axios';
import Input from "../components/Input";
import Button from "../components/Button";
import styles from '../components/Container.module.css';
function Login() {
    const navigate = useNavigate();
    const [userID, setID] = useState("");
    const [userPW, setPW] = useState("");


    const handleSubmit = async (event) => {
        if(userID === ""){
            alert("ID를 입력해주세요");
            return;
        }
        if(userPW === ""){
            alert("Password를 입력해주세요");
            return;
        }
        event.preventDefault(); // 폼의 기본 동작 중지
        await axios.post("/api/user/login",{
            //ex) boardWriter: writer,
            userEmail: userID,
            userPW: userPW
        }).then((res) => {
            console.log(res.data);
            if(res.data === "Success"){
                alert("로그인성공!");
                navigate('/board/paging', {replace: true}); // 홈으로 이동
            }else{
                alert("로그인 실패! 다시 시도해주십시오!");
            }
        }).catch((err)=> {
            console.log(err);
        });
    }
    const handleSignUp = async (event) => {
        event.preventDefault(); // 폼의 기본 동작 중지
        navigate('/user/signup/', {replace: true})
    }
    return (
        <div>
            <div className={styles.container}>
                <span className={styles.title}>Login</span><br/>
                <Input type="text" name="userID" hold = "ID" onChange={(value) => setID(value)} /><br/>
                <Input type="password" name="userPW" hold = "Password" onChange={(value) => setPW(value)} />
                <div className={styles.buttonContainer}>
                    <Button name="Login" name2="In" onClick={handleSubmit} ></Button>
                    <Button name="SignUp" name2="Up" onClick={handleSignUp} ></Button>
                </div>
            </div>
        </div>
    );
}

export default Login;