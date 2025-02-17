import React from 'react'
import styles from "../../styles/login.module.css"
import { useForm } from 'react-hook-form'
import *as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
export default function index() {

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .email("Please enter a valid email address")

    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const submitHandle = async (data) => {
        console.log("Data", data)
    }
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
