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
    return newPrice;
};

export const setOriginalPrice = (price, percent) => {
    let newPrice = price - (price * percent) / 100;
    return newPrice
}


export const handlePayment = async (dispatch, amount) => {
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const isScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!isScriptLoaded) {
        alert("Failed to load Razorpay script. Check your internet.");
        return;
    }

    try {
        const result = await dispatch(MakePayment({ amount })).unwrap();

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
    }
};
