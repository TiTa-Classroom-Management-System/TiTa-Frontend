export const loginUser = (payload = {}) => {
    return { type: "USER_LOGGED_IN", payload };
};
