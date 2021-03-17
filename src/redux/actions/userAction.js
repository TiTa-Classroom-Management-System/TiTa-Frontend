export const loginUser = (payload = {}) => {
  return { type: "USER_LOGGED_IN", payload };
};

export const logoutUser = () => {
  return { type: "USER_LOGGED_OUT" };
};
