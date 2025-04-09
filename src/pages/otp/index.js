import React, { useRef, useState } from 'react';
import styles from "../../styles/otp.module.css";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { Login, VerifyOtp } from '../../store/authSlice';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Preloader from "../../Component/Animated"
export default function Index() {
    const [isLogin, setIsLogin] = useState(false);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const [isError, setIsError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const dispatch = useDispatch();
    const router = useRouter()
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


    useEffect(() => {
        const storedExpiry = localStorage.getItem("otpExpiryTime");
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (storedExpiry) {
            const remainingTime = storedExpiry;
            if (remainingTime > 0) {
                setTimeLeft(remainingTime);
            } else {
                setTimeLeft(120);
            }
        } else {
            setTimeLeft(120);
        }
    }, []);
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    const updatedTime = prev - 1;
                    localStorage.setItem("otpExpiryTime", updatedTime)
                    if (updatedTime <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return updatedTime;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft]);
    const resendOtp = () => {
        setIsLogin(true)
        const newExpiryTime = Math.floor(Date.now() / 1000) + 120;

        const Email = localStorage.getItem("email")
        const resObject = {
            email: Email
        };

        ////console.log("Request Payload:", resObject);
        dispatch(Login(resObject))
            .then((res) => {

                if (res.payload.status == 200) {
                    toast.success("OTP Sent succesfully")
                    setIsLogin(false)


                }
                setIsLogin(false)
                ////console.log("Response:", res);
                localStorage.setItem("email", Email)

                localStorage.setItem("otpExpiryTime", newExpiryTime);
                setTimeLeft(120);

            })
            .catch((err) => {
                setIsLogin(false)
                console.error("API Call Failed:", err);
            });


    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
    const submitHandle = async (e) => {
        setIsLogin(true)
        e.preventDefault()
        ////console.log("Data", inputRefs[0].current.value, inputRefs[1].current.value, inputRefs[2].current.value, inputRefs[3].current.value);
        const combineString = inputRefs[0].current.value + inputRefs[1].current.value + inputRefs[2].current.value + inputRefs[3].current.value + inputRefs[4].current.value + inputRefs[5].current.value
        ////console.log("Combine", combineString)
        if (inputRefs[0].current.value == "" || inputRefs[1].current.value == "" || inputRefs[2].current.value == "" || inputRefs[3].current.value == "") {
            setIsError(true);
            setErrorMessage("Please enter valid otp");
            setIsLogin(false)
        }
        else {
            const Email = localStorage.getItem("email");
            const responseObject = {
                email: Email,
                otp: combineString
            }

            dispatch(VerifyOtp(responseObject)).then((response) => {
                ////console.log("response", response);
                if (response.payload.status == 200) {
                    localStorage.setItem("userToken", response.payload.authToken)
                    localStorage.setItem("email", response.payload.email)
                    localStorage.setItem("userId", response.payload.userId)
                    setIsLogin(false)
                    router.push("/")


                }
                if (response.payload.status == 501) {
                    toast.error("Invalid otp");
                    setIsLogin(false)
                }
                if (response.payload.status == 400) {
                    toast.error("Your otp was expired");
                    setIsLogin(false)
                }


            })
        }
    };
    const handleRestrictLength = (e) => {
        e.target.value = e.target.value.slice(0, 1); // Ensures only one character is allowed
    };





    return (
        <div className={styles.main}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {
                isLogin && (
                    <Preloader />
                )

            }
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
                        <div className={styles.resend}>
                            <p>
                                Resend OTP in {formatTime()}{" "}
                                <span
                                    onClick={timeLeft === 0 ? resendOtp : null}
                                    style={{
                                        cursor: timeLeft === 0 ? "pointer" : "not-allowed",
                                        color: timeLeft === 0 ? "blue" : "gray",
                                    }}
                                >
                                    Resend
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
