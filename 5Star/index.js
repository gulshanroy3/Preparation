const parent = document.getElementById("parent");
const arr = [1, 2, 3, 4, 5];
const createStars = () => {
  arr.forEach((each) => {
    const el = document.createElement("div");
    el.setAttribute("star", each);
    el.setAttribute("class", "star");
    el.setAttribute("id", each + "star");
    parent.appendChild(el);
  });
};

const getStars = (num) => console.log(num);

parent.addEventListener("mouseover", (e) => {
  let id = e.target.id;
  if (id !== "parent") {
    const range = parseInt(document.getElementById(id).getAttribute("star"));
    getStars(range);
    for (let i = 1; i <= range; i++) {
      const e = document.getElementById(i + "star");
      e.style.background = "red";
    }
    for (let i = range + 1; i <= 5; i++) {
      document.getElementById(i + "star").style.background = "white";
    }
  }
});

createStars();
