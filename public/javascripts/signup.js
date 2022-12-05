import axios from "axios";

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    console.log("err");
  }
};
