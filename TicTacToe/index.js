const parent = document.getElementById("parent");
const res = document.getElementById("result");
// const inputRows = document.getElementById("noOfRows");
// const button = document.getElementById("sumbit-Button");
// const reset = document.getElementById("reset-Button");
let numOfRows = 10;
// inputRows.addEventListener("change", (e) => {
//   let val = parseInt(e.target.value);
//   if (val !== NaN && val > 1) {
//     button.removeAttribute("disabled");
//     numOfRows = val;
//   }
// });
// button.addEventListener("click", (e) => {
//   e.preventDefault();
//   inputRows.setAttribute("disabled", "");
//   button.setAttribute("disabled", "");
//   createBoard();
// });
// reset.addEventListener("click", (e) => {
//   resetGame();
// });
let selected = {
  X: [],
  O: [],
};
let currentPlayer = "X";

const createBoard = () => {
  let str = "";
  let col = 1;
  for (i = 1; i <= numOfRows; i++) {
    const el = document.createElement("div");
    el.setAttribute("class", "row");
    el.setAttribute("id", `row${i}`);
    for (j = 1; j <= numOfRows; j++) {
      str += `<div class='col' col=${j} row=${i} id=${col}-col></div>`;
      col += 1;
    }
    el.innerHTML = str;
    str = "";
    parent.appendChild(el);
  }
};

parent.addEventListener("click", (e) => {
  const id = e.target.id;
  if (id?.includes("col")) {
    const el = document.getElementById(id);
    el.innerHTML = `<span class='selected'>${currentPlayer}</span>`;
    el.style.pointerEvents = "none";

    const row = el.getAttribute("row");
    const col = el.getAttribute("col");
    selected[currentPlayer].push([row, col]);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
  checkResult();
});

function checkResult() {
  console.log(selected);
  const lastTeam = currentPlayer === "X" ? "O" : "X";
  const checkingFor = selected[lastTeam];
  if (checkingFor.length < numOfRows) return false;
  const diagonal = checkDiagonal(checkingFor);
  const rowCOl = checkRowAndCol(checkingFor);
  if (diagonal || rowCOl) {
    res.innerHTML = `${lastTeam} team won, congratulation!!!!`;
    resetGame();
  }
}

function checkDiagonal(arr) {
  let count1 = 0;
  let count2 = 0;
  for (let i = 0; i < arr.length; i++) {
    const row = parseInt(arr[i][0]);
    const col = parseInt(arr[i][1]);
    if (row === col) {
      count1 += 1;
    }
    if (Math.abs(row + col) === numOfRows + 1) {
      count2 += 1;
    }
  }
  return count1 === numOfRows || count2 === numOfRows;
}

function checkRowAndCol(arr) {
  let countRow = {};
  let countCol = {};

  for (let i = 0; i < arr.length; i++) {
    const row = arr[i][0];
    const col = arr[i][1];
    if (countRow[row]) {
      countRow[row] += 1;
    } else {
      countRow[row] = 1;
    }
    if (countCol[col]) {
      countCol[col] += 1;
    } else {
      countCol[col] = 1;
    }
  }
  return (
    Object.keys(countRow).some((each) => countRow[each] === numOfRows) ||
    Object.keys(countCol).some((each) => countCol[each] === numOfRows)
  );
}

const resetGame = () => {
  parent.innerHTML = "";
  currentPlayer = "X";
  //   inputRows.removeAttribute("disabled");
  selected = {
    X: [],
    O: [],
  };
};

createBoard();
