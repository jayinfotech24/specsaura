import React from 'react'
import styles from "../../styles/login.module.css"
import { useForm } from 'react-hook-form'
import *as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { Login } from "../../store/authSlice"
export default function index() {

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .email("Please enter a valid email address")

    });

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const submitHandle = async (data) => {
        const resObject = {
            email: data.email
        };

        console.log("Request Payload:", resObject);
        dispatch(Login(resObject))
            .then((res) => {
                console.log("Response:", res);
                localStorage.setItem("email", data.email)

            })
            .catch((err) => {
                console.error("API Call Failed:", err);
            });
    };

    return (
        <div className={styles.main}>
            <div className={styles.inner}>

                <div className={styles.logo}>
                    <img src="/Images/logo2 (1).png" />
                </div>
                <hr></hr>
                <div className={styles.formContainer}>
                    <div className={styles.content}>
                        <h2>
                            Great to have you back!
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit(submitHandle)}>
                        <div className={styles.inputContainer}>
                            <input type="text" placeholder='Email address' {...register("email")} maxLength={30} />
                            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}

                        </div>
                        <div className={styles.buttonContainer}>
                            <button type='submit'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
