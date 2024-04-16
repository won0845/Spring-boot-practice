import styles from './Button.module.css';

function Button(props) {
    return (
        <div>
            <div className={styles.buttonContainer}>
                <div className={styles.button} onClick={props.onClick}>
                    <p className={styles.btnText}>{props.name}</p>
                    <div className={styles.btnTwo}>
                        <p className={styles.btnText2}>{props.name2}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Button;