import { toast } from "react-toastify";
import { MakePayment, VerifyPayment } from "./authSlice";


export const Validate = (router) => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
        // router.push("/login");
        return false
    } else {
        return true;
    }


}


export const IncreasePrice = (price) => {
    let newPrice = price + (price * 2) / 100;

    return Math.abs(newPrice);
};

export const setOriginalPrice = (price, percent) => {
    let newPrice = price - (price * percent) / 100;
    return newPrice
}


export const handlePayment = async (dispatch, amount) => {
    ////console.log("Payment amount:", amount);

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        console.error("Razorpay key is not configured");
        toast.error("Payment configuration error. Please try again later.");
        return;
    }

    // Convert amount to paise (smallest currency unit)
    const amountInPaise = Math.round(amount * 100);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => {
                console.error("Failed to load Razorpay script");
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const isScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!isScriptLoaded) {
        toast.error("Failed to load payment system. Please check your internet connection.");
        return;
    }

    try {
        const result = await dispatch(MakePayment({ amount: amountInPaise })).unwrap();
        ////console.log("Payment order created:", result);

        if (!result || !result.id) {
            throw new Error("Invalid payment order response");
        }

        return new Promise((resolve, reject) => {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amountInPaise,
                currency: "INR",
                name: "Specsaura",
                description: "Specsaura",
                order_id: result.id,
                handler: async function (response) {
                    ////console.log("Payment response:", response);
                    const payload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    try {
                        const verifyRes = await dispatch(VerifyPayment(payload)).unwrap();
                        ////console.log("Payment verified:", verifyRes);
                        toast.success("Payment successful!");
                        resolve(verifyRes);
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        toast.error("Payment verification failed. Please contact support.");
                        reject(error);
                    }
                },
                prefill: {
                    name: "Mihir Yoganandi",
                    email: "yoganandimihir@gmail.com",
                    contact: "9313331856",
                },
                theme: {
                    color: "#1A73E8",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        });
    } catch (error) {
        console.error("Payment error:", error);
        if (error.response?.status === 500) {
            toast.error("Server error. Please try again later.");
        } else {
            toast.error("Payment failed. Please try again.");
        }
        throw error;
    }
};
