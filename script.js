const MAX_SIZE_OF_TABLE = 20

const body = document.body;

const divWithInputs = document.createElement("div");
divWithInputs.className = "inputs__wrapper";
body.prepend(divWithInputs);

const title = document.createElement("h1");
title.className = "title";
title.innerHTML = `Максимальний розмір таблиці ${MAX_SIZE_OF_TABLE}х${MAX_SIZE_OF_TABLE}`
body.prepend(title);

const labelRaws = document.createElement("label");
labelRaws.className = "label";
divWithInputs.append(labelRaws);
labelRaws.innerHTML = "Кількість рядків";

const inputRaws = document.createElement("input");
inputRaws.className = "input error";
divWithInputs.append(inputRaws);

const labelColumns = document.createElement("label");
labelColumns.className = "label";
divWithInputs.append(labelColumns);
labelColumns.innerHTML = "Кількість стовпчиків";

const inputColumns = document.createElement("input");
inputColumns.className = "input error";
divWithInputs.append(inputColumns);

const button = document.createElement("button");
button.innerHTML = "Показати таблицю";
button.className = "button";
divWithInputs.after(button);

const table = document.createElement("div");
table.className = "table";
button.after(table)

function inputValidation(e) {
  const value = e.target.value
  if (value.trim() === "" ||
    !Number.isInteger(+value) ||
    isNaN(value) ||
    !isFinite(value) ||
    +value <= 0 ||
    +value > MAX_SIZE_OF_TABLE) {
    this.classList.add("error")
  } else {
    this.classList.remove("error")
  }
}

inputRaws.oninput = inputValidation;
inputColumns.oninput = inputValidation;

function getTable(e) {
  table.innerHTML = "";

  if (inputRaws.classList.contains("error") || inputColumns.classList.contains("error")) {
    alert("Введіть коректні значення")
    return
  }

  const raws = inputRaws.value;
  const columns = inputColumns.value;

  //Рахуєм матрицю таблиці множення
  const ans = [];
  for (let i = 1; i <= columns; i++) {
    for (let j = 0; j <= raws; j++) {
      if (i === 1) {
        ans.push([j]);
      }
      if (j === 0) {
        ans[j].push(i);
        continue;
      }
      ans[j][i] = i * j;
    }
  }

  //Додаємо матрицю таблиці на сторінку
  for (let i = 0; i < ans.length; i++) {
    for (let j = 0; j < ans[i].length; j++) {
      const number = document.createElement("span");
      number.className = "number";
      number.innerHTML = ans[i][j];
      if (i === 0) {
        number.classList.add("underline");
      }
      if (j === 0) {
        number.classList.add("rightline");
      }
      if (i === 0 && j === 0) {
        number.innerHTML = "";
        number.classList.remove("rightline");
        number.classList.remove("underline");
      }

      table.append(number);
    }
  }

  table.style.gridTemplateColumns = `repeat(${+columns + 1}, auto)`;
  table.style.gridTemplateRows = `repeat(${+raws + 1}, auto)`;
}

button.onclick = getTable;