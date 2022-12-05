import axios from "axios";
const form = document.querySelector(".form--registerSite");
const addBtn = document.querySelector(".add-Btn");
let count = document.querySelector(".count");
const siteName = document.getElementById("siteName");
const description = document.getElementById("siteDescription");
const abc = document.querySelector(".abc");
const loginForm = document.querySelector(".form--login");
import { login } from "./login";

if (addBtn) {
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(count.value);

    for (let i = 1; i <= count.value; i++) {
      abc.insertAdjacentHTML(
        "beforeend",
        `<label for="param${i}">parameter-${i}:</label> <input type="text" id="param${i}" name="parameter_${i}"/>`
      );
    }
  });
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    var paraArray = [];
    // console.log('inside login form');
    var parameters = abc.children;
    console.log(parameters);

    for (let i = 1; i <= parameters.length; i = i + 2) {
      if (parameters[i].tagName === "INPUT") {
        paraArray.push(parameters[i].value);
      }
    }
    console.log(paraArray);

    try {
      console.log("before request");
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:3000/adminpanel",
        data: {
          siteName: siteName.value,
          description: description.value,
          parameterCount: count.value,
          allparameters: paraArray,
        },
      });

      console.log(res.data.status === "success");
    } catch (error) {
      console.log(error);
    }
  });
}

console.log(loginForm);
if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log('inside login form');

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
