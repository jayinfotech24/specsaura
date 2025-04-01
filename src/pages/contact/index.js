import React, { useEffect, useState } from 'react'
import styles from "../../styles/contact.module.css"
import Footer from "../../Component/Footer"
import Header from "../../Component/Header"
import { useForm } from 'react-hook-form'
import *as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux'
import { Contact } from '../../store/authSlice'
import toast, { Toaster } from 'react-hot-toast'
import Preloader from "../../Component/Animated"
import { useRouter } from 'next/router'
import { Validate } from '../../store/commonFunction'
export default function index() {


    const router = useRouter();


    useEffect(() => {
        Validate(router)
    }, [])

    const [IsLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .email("Please enter a valid email address"),
        name: yup
            .string()
            .required("Please enter your name"),
        message: yup
            .string()
            .required("Please enter your message"),
        subject: yup
            .string()
            .required("Please enter your subject"),
        contact: yup
            .number()

            .typeError("Please enter a valid contact")
            .required("Please enter your contact number"),

    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const submitHandler = async (data) => {
        setIsLoading(true)
        const responseObject = {
            name: data.name,
            email: data.email,
            number: data.contact,
            subject: data.subject,
            message: data.message
        }
        //console.log("res", responseObject)

        dispatch(Contact(responseObject)).then((response) => {
            //console.log("Res", response)
            if (response.payload.status == 201) {
                setIsLoading(false)
                toast.success("Your Message sent successfully")
            }
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            //console.log("error", error)
        })
    }

    const handleRestrictLenght = (e, length) => {
        if (e.target.value.length > length) {
            e.target.value = e.target.value.slice(0, length);
        }
    }
    return (
        <div className={styles.main}>
            {
                IsLoading && (
                    <Preloader />
                )

            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Header isHeaderVisible={true} />
            <div className={styles.inner}>

                <div className={styles.left}>
                    <h2>Have any question?</h2>
                    <h1>Write a Message</h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className={styles.container}>
                            <div className={styles.inputContainer}>
                                <input type='text' placeholder='Your Name' {...register("name")} maxLength={20} />
                                {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
                            </div>
                            <div className={styles.inputContainer}>
                                <input type='text' placeholder='Email' {...register("email")} maxLength={64} />
                                {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.inputContainer}>
                                <input type='number' placeholder='Contact' {...register("contact")} onChange={(e) => handleRestrictLenght(e, 10)} />
                                {errors.contact && <p className={styles.errorMessage}>{errors.contact.message}</p>}
                            </div>
                            <div className={styles.inputContainer}>
                                <input type='text' placeholder='Subject' {...register("subject")} maxLength={20} />
                                {errors.subject && <p className={styles.errorMessage}>{errors.subject.message}</p>}
                            </div>

                        </div>
                        <div className={styles.textContainer}>
                            <textarea placeholder='Message' {...register("message")} maxLength={250} />
                            {errors.message && <p className={styles.textErrorMessage}>{errors.message.message}</p>}
                        </div>
                        <button type='submit'>
                            Send A Message
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h2>Contact With Us</h2>
                    <h1>Let’s work together</h1>

                    <p>Offering expert construction, renovation, and furniture solutions tailored to your needs, along with innovative IT services, planning, and design support to bring your vision to life..</p>
                    <div className={styles.contactContainer}>
                        <div className={styles.cardContainer}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>

                        </div>
                        <div className={styles.detail}>
                            <h3>Have Any Question?</h3>

                            <h2>+91 97140 37223</h2>
                        </div>
                    </div>
                    <div className={styles.contactContainer}>
                        <div className={styles.cardContainer}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>

                        </div>
                        <div className={styles.detail}>
                            <h3>Send Email</h3>

                            <h2>specsauraworks@gmail.com</h2>
                        </div>
                    </div>
                    <div className={styles.contactContainer}>
                        <div className={styles.cardContainer}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-house"><path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" /><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" /><path d="M18 22v-3" /><circle cx="10" cy="10" r="3" /></svg>

                        </div>
                        <div className={styles.detail}>
                            <h3>Address</h3>

                            <h2>Shop no 30,  Shardhadeep Complex, Near Laxmi Gathiya Rath, Opp. Anant Atila,
                                Shastri nagar cross road.  Ahmedabad ,
                                Gujarat.
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
