const numbersButtons = document.querySelectorAll(".number");
const ACBtn = document.getElementById("ac");
const deleteBtn = document.querySelector("#delete");
const operations = document.querySelectorAll("#operation");
const equalBtn = document.getElementById("equal");
const previosText = document.querySelector(".previos");
const currentText = document.querySelector(".current");
// function to make numButtons work
function appendNumber(number) {
  if (number === "." && currentText.innerText.toString().includes(".")) return;
  currentText.innerText = `${currentText.innerText}${number}`;
}
// add the operation to the end of the previosText
function operate(operation) {
  if (previosText.innerText === "" && currentText.innerText === "") return;
  if (
    previosText.innerText !== "" &&
    isNaN(parseInt(previosText.innerText[previosText.innerText.length - 1])) &&
    currentText.innerText === ""
  )
    return;
  if (previosText.innerText !== "" && currentText.innerText !== "") {
    result(
      previosText.innerText[previosText.innerText.length - 1],
      parseFloat(previosText.innerText),
      parseFloat(currentText.innerText)
    );
  }
  previosText.innerText =
    currentText.innerText.toString() + " " + operation.toString();
  currentText.innerText = "";
}
// function to execute operations (+ - * ÷)
function result(operation, x, y) {
  if (previosText.innerText === "" || currentText.innerText === "") return;
  let z = 0;
  switch (operation) {
    case "+":
      z = x + y;
      break;
    case "*":
      z = x * y;
      break;
    case "÷":
      z = x / y;
      break;
    case "-":
      z = x - y;
      break;
  }
  let zArray = [...z.toString()];
  let round = 0;
  for (let i in zArray) {
    if (zArray[i] === ".") {
      round = zArray.length - i - 1;
    }
  }
  if (round > 9) {
    z = parseFloat(z).toFixed(9);
  }
  currentText.innerText = z.toString();
  previosText.innerText = "";
}

numbersButtons.forEach((e) => {
  e.addEventListener("click", () => {
    appendNumber(e.innerText);
  });
});

ACBtn.addEventListener("click", () => {
  previosText.innerText = "";
  currentText.innerText = "";
});

operations.forEach((e) => {
  e.addEventListener("click", () => {
    operate(e.innerText);
  });
});

equalBtn.addEventListener("click", () => {
  result(
    previosText.innerText[previosText.innerText.length - 1],
    parseFloat(previosText.innerText),
    parseFloat(currentText.innerText)
  );
});

deleteBtn.addEventListener("click", () => {
  currentText.innerText = currentText.innerText.slice(0, -1);
});
