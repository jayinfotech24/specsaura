
const Appapis = {
    Basurl: "https://specsauradataplazma.vercel.app/api",
    signIn: "/request",
    signOut: "/signOut",
    verifyOtp: "/verify",
    contact: "/contact",
    prescription: "/presc",
    fileUpload: "/upload",
    ctegory: "/category",
    wallpaper: "/wallpaper",
    product: "/products/all",
    cart: "/cart",
    productDetail: (id) => `/product/${id}`,
    createPayment: "/createPaymentOrder",
    verify: "/varifyPayment",
    cartItems: (id) => `/cart/${id}`,
}

export default Appapis