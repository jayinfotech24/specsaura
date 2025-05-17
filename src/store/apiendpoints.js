const Appapis = {
    Basurl: "http://api.specsaura.com/api",
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
    Getuser: "/user/info",
    getOrder: (id) => `/orders/user/${id}`,
    updateUser: `/user/update/`,
    deleteFullCart: "/cart",
    getCartMany: "/cart",
    getSingleCart: (id) => `/cart/${id}`
}

export default Appapis