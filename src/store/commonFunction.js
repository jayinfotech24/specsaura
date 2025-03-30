

export const Validate = (router) => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
        // router.push("/login");
        return false
    } else {
        return true;
    }


}
