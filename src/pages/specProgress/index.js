import React, { useEffect, useState } from 'react'
import styles from "../../styles/progress.module.css"
import ProgressHeader from '../../Component/ProgressHeader'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Validate } from '../../store/commonFunction';
import { useForm } from 'react-hook-form'
import *as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SavePrescription } from '../../store/authSlice';
export default function index() {

    const [firstStep, setFirstStep] = useState(true);
    const [secondStep, setSecondStep] = useState(false);
    const [thiredStep, setThiredStep] = useState(false);
    const [fourthStep, setFourtStep] = useState(false)
    const [isOneComplete, setIsOneComplete] = useState(false);
    const [isTwoComplete, setIsTwoComplete] = useState(false);
    const [isThiredComplete, setIsThiredComplete] = useState(false)
    const [isFourthComplete, setIsFourthComplete] = useState(false)
    const inputRef = useRef()
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFile, setIsFile] = useState(false)
    const router = useRouter();
    const [IsBifocel, setIsBifocal] = useState(false)

    const dispatch = useDispatch();




    useEffect(() => {
        Validate(router)
    }, [])

    const Changepage = (number, IsFile) => {
        if (number == 0) {
            setFirstStep(true)
            setSecondStep(false);
            setThiredStep(false)
            setIsFourthComplete(false)
            setFourtStep(false)

        }
        if (number == 1) {
            setFirstStep(false)
            setSecondStep(true);
            setThiredStep(false)
            setIsOneComplete(true)
            setIsFourthComplete(false)
            setFourtStep(false)
        }
        if (number == 2) {
            setFirstStep(false)
            setSecondStep(false);
            setThiredStep(true);
            setIsTwoComplete(true)
            setIsFourthComplete(false)
            setFourtStep(false)


        }
        if (number == 3) {
            setIsThiredComplete(true)
            setFirstStep(false)
            setSecondStep(false);
            setFourtStep(true)
            setIsFourthComplete(false)
            setThiredStep(false)


        }
        // if (number == 4) {
        //     setIsFourthComplete(true)

        // }
    }


    useEffect(() => {
        console.log("Is", isFile)
    }, [isFile])

    const FirstPage = () => {

        return (
            <motion.div
                className={styles.firstMain}
                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >



                <div className={styles.firstInner}>
                    <h1>Select your Power Type</h1>
                    <div className={styles.firstCardContainer}>

                        <div className={styles.card} onClick={() => Changepage(1)}>
                            <div className={styles.left}>
                                <img src="/Images/single_vision.webp" />
                            </div>
                            <div className={styles.right}>
                                <div className={styles.content}>
                                    <button>
                                        Single Vision

                                    </button>
                                    <p>For distance or near vision (Thin, anti-glare, blue-cut options)</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>

                            </div>
                        </div>
                        <div className={styles.card} onClick={() => Changepage(1)}>
                            <div className={styles.left}>
                                <img src="/Images/bifocal.webp" />
                            </div>
                            <div className={styles.right} onClick={() => {
                                setIsBifocal(true)
                                Changepage(1)
                            }}>
                                <div className={styles.content}>
                                    <button>
                                        Bifocal/Progressive

                                    </button>
                                    <p>Bifocal and Progressives (For two powers in same lenses)</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>

                            </div>
                        </div>
                        <div className={styles.card} onClick={() => Changepage(1)}>
                            <div className={styles.left}>
                                <img src="/Images/zero_power.webp" />
                            </div>
                            <div className={styles.right}>
                                <div className={styles.content}>
                                    <button>
                                        Zero Power

                                    </button>
                                    <p>Block 98% of harmful rays (Anti-glare and blue-cut options)</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>

                            </div>
                        </div>
                        <div className={styles.card} onClick={() => router.push("/cart")}>
                            <div className={styles.left}>
                                <img src="/Images/frame_only.webp" />
                            </div>
                            <div className={styles.right}>
                                <div className={styles.content}>
                                    <button>
                                        Frame Only

                                    </button>
                                    <p>Buy Only Frame</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>

                            </div>
                        </div>

                    </div>

                </div>
            </motion.div>
        )
    }
    const SecondPage = () => {

        return (
            <motion.div
                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.secondMain}>

                <button className={styles.backButton} onClick={() => Changepage(0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                </button>
                <div className={styles.secondInner}>
                    <h1>Add Your Prescription</h1>

                    <div className={styles.OptionContainer}>
                        <div className={styles.optionCard} onClick={() => {
                            setIsFile(true)
                            Changepage(2)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                            <h2>Upload File</h2>
                        </div>

                        <div className={styles.optionCard} onClick={() => Changepage(2)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /></svg>
                            <h2>Enter Manually</h2>
                        </div>

                    </div>
                </div>

            </motion.div>
        )
    }

    const ThiredPage = () => {
        return (
            <motion.div

                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.thiredMain}>
                {/* <div className={styles.thiredInner}>
                    <h1>Choose Lens Package</h1>
                    <div className={styles.thiredCardContainer}>
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.buttonContainer}>
                                    <p>Anti-Glare Premium</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                                <div className={styles.contentList}>
                                    <ul className={styles.list}>
                                        <li>6 Months Warranty</li>
                                        <li>Double Side Anti-Glare</li>
                                        <li>6 Months Warranty</li>

                                    </ul>
                                </div>
                                <div className={styles.total}>
                                    <h2>Frame+Lens: Get it for ₹1500</h2>
                                </div>
                            </div>

                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.buttonContainer}>
                                    <p>Anti-Glare Premium</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                                <div className={styles.contentList}>
                                    <ul className={styles.list}>
                                        <li>6 Months Warranty</li>
                                        <li>Double Side Anti-Glare</li>
                                        <li>6 Months Warranty</li>

                                    </ul>
                                </div>
                                <div className={styles.total}>
                                    <h2>Frame+Lens: Get it for ₹1500</h2>
                                </div>
                            </div>

                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.buttonContainer}>
                                    <p>Anti-Glare Premium</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                                <div className={styles.contentList}>
                                    <ul className={styles.list}>
                                        <li>6 Months Warranty</li>
                                        <li>Double Side Anti-Glare</li>
                                        <li>6 Months Warranty</li>

                                    </ul>
                                </div>
                                <div className={styles.total}>
                                    <h2>Frame+Lens: Get it for ₹1500</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> */}
                <button className={styles.backButton} onClick={() => Changepage(2)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                </button>
                <div className={styles.thiredInner}>
                    <div className={styles.thiredCardContainer} onClick={() => router.push("/payment")}>

                        <div className={styles.ImageContainer}>
                            <img src="/Images/card.webp" />
                        </div>
                        <div className={styles.ContentContainer}>
                            <h2>1.61 - Thin BluPro Single-Vision</h2>


                        </div>

                    </div>
                    <div className={styles.thiredCardContainer} onClick={() => router.push("/payment")}>

                        <div className={styles.ImageContainer}>
                            <img src="/Images/card.webp" />
                        </div>
                        <div className={styles.ContentContainer}>
                            <h2>1.61 - Thin BluPro Single-Vision</h2>


                        </div>

                    </div>   <div className={styles.thiredCardContainer} onClick={() => router.push("/payment")}>

                        <div className={styles.ImageContainer}>
                            <img src="/Images/card.webp" />
                        </div>
                        <div className={styles.ContentContainer}>
                            <h2>1.61 - Thin BluPro Single-Vision</h2>


                        </div>

                    </div>
                </div>

            </motion.div>
        )
    }

    const FourtPage = () => {
        const buttonRef = useRef(null)

        const axisValues = Array.from({ length: 181 }, (_, i) => i.toString());
        const pdValues = Array.from({ length: (79 - 35) * 2 + 1 }, (_, i) => (35 + i * 0.5).toFixed(1));
        const useIsMobile = () => {
            const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

            useEffect(() => {
                const handleResize = () => setIsMobile(window.innerWidth < 768);
                window.addEventListener("resize", handleResize);
                return () => window.removeEventListener("resize", handleResize);
            }, []);

            return isMobile;
        };
        const isMobile = useIsMobile();

        console.log("Is", isMobile)
        const validationSchema = yup.object().shape({
            rightsph: yup.string().required("Right SPH is required"),
            rightcyl: yup.string().required("Right CYL is required"),
            rightaxis: yup.string().required("Right Axis is required"),
            leftsph: yup.string().required("Left SPH is required"),
            leftcyl: yup.string().required("Left CYL is required"),
            leftaxis: yup.string().required("Left Axis is required"),
            pd: !IsBifocel
                ? yup.string().required("Pupillary Distance is required")
                : yup.string().notRequired()


        });

        const MobileValidationSchema = yup.object().shape({
            rightsph: yup.string().required("Right SPH is required"),
            rightcyl: yup.string().required("Right CYL is required"),
            rightaxis: yup.string().required("Right Axis is required"),
            leftsph: yup.string().required("Left SPH is required"),
            leftcyl: yup.string().required("Left CYL is required"),
            leftaxis: yup.string().required("Left Axis is required"),
            pd: !IsBifocel
                ? yup.string().required("Pupillary Distance is required")
                : yup.string().notRequired()
        })




        const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(isMobile ? MobileValidationSchema : validationSchema)
        });
        useEffect(() => {
            console.log("Err", Object.keys(errors).length)
            if (Object.keys(errors).length > 0) {
                alert("Please  fill all detail")
            }
        }, [errors])
        const SubmitHandler = async (data) => {

            console.log("Data", data)
            const responseObject = {
                rightEye: {
                    sphere: data.rightsph,
                    cylinder: data.rightcyl,
                    axis: data.axis,
                    add: "2.00",
                    pd: data.pd
                },
                leftEye: {
                    sphere: data.leftsph,
                    cylinder: data.leftcyl,
                    axis: data.leftaxis,
                    add: "2.00",
                    pd: data.pd
                },
            }

            dispatch(SavePrescription(responseObject)).then((res) => {
                console.log("res", res)
            }).catch((errr) => {
                console.log("Err", errr)
            })
        }
        const handleClick = (e) => {
            e.preventDefault()
            inputRef.current.click()
        }
        const handleFileChange = (event) => {
            event.preventDefault()
            const file = event.target.files[0]; // Get the first selected file
            if (file) {
                setSelectedFile(file);

            }
        };
        const handleHiddenButtonClick = () => {
            // console.log("Hidden button clicked!");
            // alert("Hidden button was triggered!");
        };
        const handleUpload = () => {
            if (buttonRef.current) {
                console.log("Triggering hidden button click..."); // Debugging log
                buttonRef.current.click();
            } else {
                console.error("buttonRef is undefined!"); // Debugging log
            }
        }
        const HandleSaveFile = (e) => {
            e.preventDefault()
            if (!selectedFile) {
                alert("Please upload a file before proceeding.");
                return;
            }
            Changepage(3)
            console.log("File uploaded:", selectedFile);
        }
        return (
            <div
                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.forthMain}>
                <button className={styles.backButton} onClick={() => Changepage(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                </button>
                {!isFile && <div className={styles.forthInner}>
                    <h1>Enter Your Prescription Manually</h1>

                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit(SubmitHandler)}>


                            <table>
                                <thead>
                                    <tr>
                                        <td></td>
                                        <td>SPH</td>
                                        <td>CYL</td>
                                        <td>Axis</td>
                                    </tr>

                                </thead>
                                <tbody>
                                    <tr>
                                        <td>OD(Right)</td>
                                        <td>
                                            <select {...register("rightsph")}>
                                                <option value="" disabled selected>-- Select --</option> {/* Default option */}

                                                {[
                                                    "-10.00", "-9.75", "-9.50", "-9.25", "-9.00", "-8.75", "-8.50", "-8.25", "-8.00",
                                                    "-7.75", "-7.50", "-7.25", "-7.00", "-6.75", "-6.50", "-6.25", "-6.00",
                                                    "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                                    "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00",
                                                    "-1.75", "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                                    "+0.25", "+0.50", "+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00",
                                                    "+2.25", "+2.50", "+2.75", "+3.00", "+3.25", "+3.50", "+3.75", "+4.00"
                                                ].map((value) => (
                                                    <option key={value} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select {...register("rightcyl")}>
                                                <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                                {[
                                                    "-6.00", "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                                    "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00", "-1.75",
                                                    "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                                    "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00",
                                                    "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75", "4.00",
                                                    "4.25", "4.50", "4.75", "5.00", "5.25", "5.50", "5.75", "6.00"
                                                ].map((value) => (
                                                    <option key={value} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select {...register("rightaxis")}>
                                                <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                                {axisValues.map((value, index) => (
                                                    <option key={index} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>OS (Left)</td>
                                        <td >
                                            <select {...register("leftsph")}>
                                                <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                                {[
                                                    "-10.00", "-9.75", "-9.50", "-9.25", "-9.00", "-8.75", "-8.50", "-8.25", "-8.00",
                                                    "-7.75", "-7.50", "-7.25", "-7.00", "-6.75", "-6.50", "-6.25", "-6.00",
                                                    "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                                    "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00",
                                                    "-1.75", "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                                    "+0.25", "+0.50", "+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00",
                                                    "+2.25", "+2.50", "+2.75", "+3.00", "+3.25", "+3.50", "+3.75", "+4.00"
                                                ].map((value) => (
                                                    <option key={value} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td >
                                            <select {...register("leftcyl")}>
                                                <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                                {[
                                                    "-6.00", "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                                    "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00", "-1.75",
                                                    "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                                    "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00",
                                                    "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75", "4.00",
                                                    "4.25", "4.50", "4.75", "5.00", "5.25", "5.50", "5.75", "6.00"
                                                ].map((value) => (
                                                    <option key={value} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td >
                                            <select {...register("leftaxis")}>
                                                <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                                {axisValues.map((value, index) => (
                                                    <option key={index} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    {!IsBifocel &&
                                        <tr>
                                            <td >Pupillary Distance (PD)</td>



                                            <td className={styles.lastTd} colSpan="2">
                                                <select {...register("pd")}>
                                                    <option value="" disabled selected>-- Select --</option>
                                                    {pdValues.map((value, index) => (
                                                        <option key={index} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>


                                            <td className={styles.checkBox}><input type="checkbox" /> <label>Have two PDs</label></td>
                                        </tr>
                                    }

                                </tbody>

                            </table>
                            <button type='submit' display="none" ref={buttonRef} onClick={handleHiddenButtonClick}>

                            </button>
                        </form>
                    </div>

                    <div className={styles.mobileFormContainer}>
                        <div className={styles.row}>
                            <h2>OD(Right Eye)</h2>
                            <div className={styles.columnContainer}>
                                <div className={styles.column}>
                                    <label>SPH</label>
                                    <select>
                                        <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                        {[
                                            "-10.00", "-9.75", "-9.50", "-9.25", "-9.00", "-8.75", "-8.50", "-8.25", "-8.00",
                                            "-7.75", "-7.50", "-7.25", "-7.00", "-6.75", "-6.50", "-6.25", "-6.00",
                                            "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                            "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00",
                                            "-1.75", "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                            "+0.25", "+0.50", "+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00",
                                            "+2.25", "+2.50", "+2.75", "+3.00", "+3.25", "+3.50", "+3.75", "+4.00"
                                        ].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className={styles.column}>
                                    <label>CYL</label>
                                    <select>
                                        <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                        {[
                                            "-6.00", "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                            "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00", "-1.75",
                                            "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                            "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00",
                                            "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75", "4.00",
                                            "4.25", "4.50", "4.75", "5.00", "5.25", "5.50", "5.75", "6.00"
                                        ].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className={styles.column}>
                                    <label>AXIS</label>
                                    <select>
                                        <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                        {axisValues.map((value, index) => (
                                            <option key={index} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            </div>

                        </div>
                        <div className={styles.row}>
                            <h2>OS (Left Eye)</h2>
                            <div className={styles.columnContainer}>
                                <div className={styles.column}>
                                    <label>SPH</label>
                                    <select>
                                        <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                        {[
                                            "-10.00", "-9.75", "-9.50", "-9.25", "-9.00", "-8.75", "-8.50", "-8.25", "-8.00",
                                            "-7.75", "-7.50", "-7.25", "-7.00", "-6.75", "-6.50", "-6.25", "-6.00",
                                            "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                            "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00",
                                            "-1.75", "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                            "+0.25", "+0.50", "+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00",
                                            "+2.25", "+2.50", "+2.75", "+3.00", "+3.25", "+3.50", "+3.75", "+4.00"
                                        ].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className={styles.column}>
                                    <label>CYL</label>
                                    <select>
                                        {[
                                            "-6.00", "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25", "-4.00",
                                            "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00", "-1.75",
                                            "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00",
                                            "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00",
                                            "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75", "4.00",
                                            "4.25", "4.50", "4.75", "5.00", "5.25", "5.50", "5.75", "6.00"
                                        ].map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className={styles.column}>
                                    <label>AXIS</label>
                                    <select>
                                        <option value="" disabled selected>-- Select --</option> {/* Default option */}
                                        {axisValues.map((value, index) => (
                                            <option key={index} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            </div>

                        </div>

                        <div className={styles.devider}></div>
                        <div className={styles.pupilDistance}>
                            <h2>Pupil Distance</h2>
                            <div className={styles.innerPupil}><input type="checkbox" /><span><p>Have two PDs</p></span></div>
                            <select>
                                <option value="" disabled selected>-- Select --</option>
                                {pdValues.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className={styles.buttonWrapper}>
                        <p>Upload your prescription for us to confirm that you have entered it correctly (Optional).</p>
                        <button >
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg></span>
                            Choose File
                        </button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type='button' onClick={handleUpload}>
                            Save and Continue
                        </button>
                    </div>

                </div>}
                {
                    isFile && (

                        <div className={styles.forthInner} style={{ height: "100vh" }} >
                            <h1>Upload Prescription</h1>
                            <p>Please upload your prescription as a PNG, JPG or PDF file.</p>
                            <form >
                                <div className={styles.buttonWrapper}>

                                    <p>Upload your prescription for us to confirm that you have entered it correctly (Optional).</p>
                                    <button onClick={(e) => handleClick(e)} >
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg></span>
                                        Choose File
                                    </button>
                                    <input type='file' ref={inputRef} style={{ display: "none" }} onChange={handleFileChange} />
                                </div>
                                <div className={styles.buttonContainer}>
                                    <button type='submit' onClick={(e) => HandleSaveFile(e)}>
                                        Save and Continue
                                    </button>
                                </div>
                            </form>
                        </div>

                    )
                }
            </div>
        )
    }


    return (
        <div className={styles.main}>
            <div className={styles.inner}>
                <ProgressHeader
                    Changepage={Changepage}
                    isOneComplete={isOneComplete}
                    isTwoComplete={isTwoComplete}
                    isThiredComplete={isThiredComplete}
                    isFourthComplete={isFourthComplete}
                />
                {firstStep && <FirstPage />}
                {secondStep && <SecondPage />}
                {thiredStep && <FourtPage />}
                {fourthStep && <ThiredPage />}

            </div>
        </div>
    )
}
