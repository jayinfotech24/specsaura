// pages/payment.js

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MakePayment, VerifyPayment } from "../../store/authSlice";
import { Verify } from "crypto";

export default function PaymentPage() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // Load Razorpay script only once
    useEffect(() => {
        if (!document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const handlePayment = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) return alert("User not authenticated!");

        const amount = 500;

        setIsLoading(true);

        try {
            // 1. Create Razorpay order via backend
            const result = await dispatch(MakePayment({ amount })).unwrap();

            console.log("Res", result)

            const options = {
                key: "rzp_test_Rw4M9MaWvEHg8C",
                amount: result.amount,
                currency: result.currency,
                name: "Specsaura",
                description: "Specsaura",
                order_id: result.id,
                handler: async function (response) {
                    const payload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    try {
                        const verifyRes = await dispatch(VerifyPayment(payload)).unwrap();
                        console.log("✅ Verified:", verifyRes);
                        alert("✅ Payment Successful");
                    } catch (error) {
                        console.error("❌ Verification Error:", error);
                        alert("❌ Payment verification failed");
                    }
                },

                prefill: {
                    name: "Mihir Yoganandi",
                    email: "mihir@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#1A73E8",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert("❌ Something went wrong. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Hello Puncture - Razorpay Payment</h1>
            <button
                onClick={handlePayment}
                disabled={isLoading}
                style={{
                    backgroundColor: "#1A73E8",
                    color: "#fff",
                    padding: "12px 24px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    opacity: isLoading ? 0.6 : 1,
                }}
            >
                {isLoading ? "Processing..." : "Pay ₹500"}
            </button>
        </div>
    );
}
