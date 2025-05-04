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
    cartItems: (id) => `/cart/all/${id}`,
    deleteCart: (id) => `/cart/${id}`,
    createOrder: "/order",
}

export default Appapis