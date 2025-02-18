import React, { useRef, useState } from 'react';
import styles from "../../styles/otp.module.css";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Index() {
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [isError, setIsError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState(null);
    const handleChange = (e, index) => {
        setIsError(false);
        if (e.target.value.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const submitHandle = async (e) => {
        e.preventDefault()
        console.log("Data", inputRefs[0].current.value, inputRefs[1].current.value, inputRefs[2].current.value, inputRefs[3].current.value);

        if (inputRefs[0].current.value == "" || inputRefs[1].current.value == "" || inputRefs[2].current.value == "" || inputRefs[3].current.value == "") {
            setIsError(true);
            setErrorMessage("Please enter valid otp");
        }
    };
    const handleRestrictLength = (e) => {
        e.target.value = e.target.value.slice(0, 1); // Ensures only one character is allowed
    };





    return (
        <div className={styles.main}>
            <div className={styles.inner}>
                <div className={styles.logo}>
                    <img src="/Images/logo2 (1).png" alt="Logo" />
                </div>
                <hr />
                <div className={styles.formContainer}>
                    <div className={styles.content}>
                        <h2>Verify OTP</h2>
                    </div>
                    <form >
                        <div className={styles.inputContainer}>
                            {inputRefs.map((ref, index) => (
                                <input
                                    key={index}
                                    type='number'
                                    maxLength={1}
                                    ref={ref}
                                    onChange={(e) => {
                                        handleRestrictLength(e, index);
                                        handleChange(e, index);
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e, index)}

                                />
                            ))}
                            {isError && <p className={styles.errorMessage}>{ErrorMessage}</p>}
                        </div>
                        <div className={styles.buttonContainer}>
                            <button onClick={(e) => submitHandle(e)}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
