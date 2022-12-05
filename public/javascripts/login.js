import axios from "axios";

export const login = async (email, password) => {
  try {
    console.log("before request");
    const res = await axios({
      method: "POST",
      url: "/users/login",
      data: { email, password },
    });
    console.log(res.data.status === "success");

    if (res.data.status === "success") {
      // console.log('inside if');
      console.log("successfully logged in");
      window.setTimeout(() => {
        location.assign("/getSiteData/637cde1ec51f8e4d28933de3");
      }, 1500);
    }
  } catch (error) {
    console.log(error);
  }
};
