export default function handler(req, res) {
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "";
    res.status(200).json({ key });
}
