const url = "https://v6.exchangerate-api.com/v6/0542982228678ddfc65001dc/latest";
const drop = document.querySelectorAll("#select select");
let fromcurr = document.querySelector("#from select");
let tocurr = document.querySelector("#to select");
let element = document.querySelector("#amount");
element.value = 1;
console.log(drop);

for (let s of drop) {
  for (curr in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = curr;
    newOpt.value = curr;
    s.append(newOpt);
    if (s.name === "from" && curr === "INR") {
      newOpt.selected = "selected";
    } else if (s.name === "to" && curr === "USD") {
      newOpt.selected = "selected";
    }
  }
  const changename = (evt, s) => {
    if (s.name === "from") {
      document.querySelector(".a").innerText = evt + " :";
    } else if (s.name === "to") {
      document.querySelector(".b").innerText = evt + " :";
    }
  };
  s.addEventListener("change", (evt) => {
    updateflag(evt.target);
    changename(evt.target.value, s);
    // console.log(evt);
  });
}
const updateflag = (evt) => {
  // console.log(evt.value);
  let cntr = countryList[evt.value];
  evt.parentElement.querySelector(".country").src = `https://flagsapi.com/${cntr}/flat/64.png`;
};
let btn = document.querySelector("#btn");
btn.addEventListener("click", async () => {
  let amount = element.value;
  if (amount < 0 || amount === "") {
    amount = 1;
    element.value = "1";
  }

  // let;
  // console.log(fromcurr.value, tocurr);
  let url2 = `${url}/${fromcurr.value}`;
  let resp = await fetch(url2);
  let resp2 = await resp.json();
  let rate = resp2.conversion_rates[tocurr.value];
  document.querySelector("#result").value = amount * rate;
});
let convert = document.querySelector("#change");
convert.addEventListener("click", () => {
  amount = document.querySelector("#result").value;
  element.value = amount;
  if (amount <= 0 || amount === "") {
    amount = 1;
    element.value = "1";
  }
  document.querySelector("#result").value = "";
  let a = fromcurr.value;
  fromcurr.value = tocurr.value;
  tocurr.value = a;
  console.log(fromcurr.value);
  url2 = `${url}/${fromcurr.value}`;
  a = document.querySelector("#from img").src;
  document.querySelector("#from img").src = document.querySelector("#to img").src;
  document.querySelector("#to img").src = a;
  document.querySelector(".a").innerText = fromcurr.value + " :";
  document.querySelector(".b").innerText = tocurr.value + " :";
  convert.classList.add("change");
  setTimeout(() => {
    convert.classList.toggle("change");
  }, 200);
});
