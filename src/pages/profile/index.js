import React, { useRef, useState } from 'react';
import styles from "../../styles/profile.module.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useForm } from 'react-hook-form'
import *as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
export default function ProfilePage() {
    const inputRef = useRef(null);
    const [image, setImage] = useState("/Images/profile.avif");

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .email("Please enter a valid email address"),

        firstName: yup.string().required("Please enter First Name"),
        lastName: yup.string().required("Please enter Last Name"),
        address: yup.string().required("Please enter your address")


    });
    const handleClick = () => {
        inputRef.current.click();
    };
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const submitHandler = async (data) => {
        //console.log("Data", data)

    }
    return (
        <div className={styles.main}>
            <Header isHeaderVisible={true} />

            <div className={styles.inner}>
                <div className={styles.formContainer}>
                    <h2>Edit Your Profile</h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className={styles.profileImageContainer}>
                            <img
                                src={image}
                                alt="Profile"
                                onClick={handleClick}
                                className={styles.profileImage}
                            />
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                ref={inputRef}
                                style={{ display: "none" }}
                                onChange={handleChangeImage}
                            />
                        </div>
                        <div className={styles.coloumnContainer}>
                            <div className={styles.inputContainer}>
                                <p>First Name</p>
                                <input type="text" placeholder='Md' {...register("firstName")} />
                                {errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}
                            </div>
                            <div className={styles.inputContainer}>
                                <p>Last Name</p>
                                <input type="text" placeholder='Rimel' {...register("lastName")} />
                                {errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className={styles.coloumnContainer}>
                            <div className={styles.inputContainer}>
                                <p>Email</p>
                                <input type="email" placeholder='rimel1111@gmail.com' {...register("email")} />
                                {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                            </div>
                            <div className={styles.inputContainer}>
                                <p>Address</p>
                                <input type="text" placeholder='Kingston, 5236, United State'
                                    {...register("address")} />
                                {errors.address && <p className={styles.errorMessage}>{errors.address.message}</p>}
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type='submit' >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
