import styles from './Input.module.css';
import React, {useState} from "react";

function Input(props) {
    const handleBlur = (event) => {
        if (props.onBlur) { // onBlur prop이 존재하는 경우에만 실행
            props.onBlur(event.target.value); // 값 업데이트를 부모로 위임
        }
    };
    return (
        <input type={props.type} className={styles.input} name={props.name} onChange={event => {
            props.onChange(event.target.value) // 값 업데이트를 부모로 위임
            }} onBlur={handleBlur} placeholder={props.hold}/>
    );
}

export default Input;