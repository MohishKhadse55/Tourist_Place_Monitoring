import axios from "axios";
let count = document.querySelector(".count");
const siteName = document.getElementById("siteName");
const description = document.getElementById("siteDescription");
let form = document.querySelector(".form--registerSite");
const addBtn = document.querySelector(".add-Btn");
console.log(addBtn);
const abc = document.querySelector(".abc");

console.log(abc);

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(count.value);

  for (let i = 1; i <= count.value; i++) {
    abc.insertAdjacentHTML(
      "beforeend",
      `<label for="param${i}">parameter-${i}:</label> <input type="text" id="param${i}" name="parameter_${i}" />`
    );
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let paraArray = [];
  // console.log('inside login form');
  const parameters = abc.children;
  console.log(parameters);

  for (let i = 1; i <= parameters.length; i = i + 2) {
    paraArray.push(parameters[i].value);
  }
  console.log(paraArray);

  try {
    console.log("before request");
    const res = await axios({
      method: "POST",
      url: "",
      data: {
        siteName: siteName,
        description: description,
        parameterCount: count.value,
        allparameters: paraArray,
      },
    });

    console.log(res.data.status === "success");
  } catch (error) {
    console.log(error);
  }
});
