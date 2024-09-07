// ! menu
let menu = document.querySelector(".menu");
let adminLinkes = document.querySelector(".adminLinkes");
let MenuOne = document.querySelector(".MenuOne");
let menuLinkes = document.querySelector(".menuLinkes");
let inputs = document.querySelectorAll("input");
let orderLinkes = document.querySelector(".orderLinkes");
let OrderOne = document.querySelector(".OrderOne");
newProduct();

function newProduct() {
  menu.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("food")) || [];
  data.forEach((el, index) => {
    let blog = document.createElement("div");
    let images = document.createElement("img");
    let textFood = document.createElement("div");
    let actionBtn = document.createElement("div");
    let nameFood = document.createElement("h3");
    let priceFood = document.createElement("h4");
    let deleteBtn = document.createElement("button");
    let orderBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    blog.classList.add("blog");
    images.classList.add("images");
    actionBtn.classList.add("actionBtn");
    textFood.classList.add("textFood");
    nameFood.classList.add("nameFood");
    priceFood.classList.add("priceFood");
    deleteBtn.classList.add("deleteBtn");
    orderBtn.classList.add("orderBtn");
    editBtn.classList.add("editBtn");

    images.src = el.imgFood;
    nameFood.innerText = el.name;
    priceFood.innerText = `${el.price}$`;

    deleteBtn.innerHTML = `<ion-icon name="trash"></ion-icon>`;
    editBtn.innerHTML = `<ion-icon name="create"></ion-icon>`;
    orderBtn.innerHTML = `<ion-icon name="cart"></ion-icon>`;

    blog.append(images);
    blog.append(textFood);
    blog.append(actionBtn);
    actionBtn.append(orderBtn);
    actionBtn.append(editBtn);
    actionBtn.append(deleteBtn);
    textFood.append(nameFood);
    textFood.append(priceFood);
    blog.append(actionBtn);
    blog.append(textFood);
    menu.append(blog);

    orderBtn.addEventListener("click", () => {
      orderProduct(el);
    });
    deleteBtn.addEventListener("click", () => {
      deleteProduct(index);
    });
    editBtn.addEventListener("click", () => {
      editProduct(index);
    });
  });
}
function editProduct(index) {
  save_btn.style.display = "block";
  create_btn.style.display = "none";
  name.setAttribute("id", index);
  let data = JSON.parse(localStorage.getItem("food")) || [];
  name.value = data[index].name;
  price.value = data[index].price;
  imgFood.value = data[index].imgFood;
  newProduct();
}

function deleteProduct(index) {
  let data = JSON.parse(localStorage.getItem("food")) || [];
  data.splice(index, 1);
  localStorage.setItem("food", JSON.stringify(data));
  newProduct();
}
function orderProduct(obj) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(obj);
  localStorage.setItem("orders", JSON.stringify(orders));
  getOrderProduct();
}

adminLinkes.addEventListener("click", () => {
  card.style.display = "block";
  MenuOne.style.display = "none";
  OrderOne.style.display = "none";
  menu.style.display = "none";
  order.style.display = "none";
});
menuLinkes.addEventListener("click", () => {
  card.style.display = "none";
  MenuOne.style.display = "block";
  menu.style.display = "flex";
  OrderOne.style.display = "none";
  order.style.display = "none";
});

orderLinkes.addEventListener("click", () => {
  card.style.display = "none";
  MenuOne.style.display = "none";
  menu.style.display = "none";
  order.style.display = "block";
  OrderOne.style.display = "block";
});

// ! order ///////////////////////////////////////////////////

let order = document.querySelector(".order");
getOrderProduct();
function getOrderProduct() {
  order.innerHTML = "";
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.forEach((el, index) => {
    let orderBlock = document.createElement("div");
    orderBlock.classList.add("orderBlock");
    let orderBtns = document.createElement("div");
    orderBtns.classList.add("orderBtns");
    let orderImg = document.createElement("img");
    orderImg.classList.add("orderImg");
    let orderText = document.createElement("div");
    orderText.classList.add("orderText");

    let orderName = document.createElement("h3");
    orderName.classList.add("orderName");
    let orderPrice = document.createElement("h4");
    orderPrice.classList.add("orderPrice");
    let orderCount = document.createElement("div");
    orderCount.classList.add("orderCount");
    let num = document.createElement("h2");

    let orderDelete = document.createElement("button");
    orderDelete.classList.add("orderDelete");
    let orderPlus = document.createElement("button");
    orderPlus.classList.add("orderPlus");
    let count = document.createElement("h2");
    count.classList.add("count");
    let orderMinus = document.createElement("button");
    orderMinus.classList.add("orderMinus");

    orderImg.src = el.imgFood;
    orderName.innerText = el.name;
    num = el.count;
    orderPrice.innerHTML = el.count * el.price;

    orderDelete.innerText = "delete order";
    orderPlus.innerText = "+";
    orderMinus.innerText = "-";
    num.innerHTML = el.count;
    // count.innerHTML = `${num}x`;

    orderBlock.append(orderImg);
    orderBlock.append(orderText);
    orderBlock.append(orderBtns);

    orderText.append(orderName);
    orderText.append(orderPrice);

    orderBtns.append(orderDelete);
    orderBtns.append(orderCount);

    orderCount.append(orderMinus);
    orderCount.append(num);
    orderCount.append(orderPlus);
    order.append(orderBlock);
    console.log(el);

    orderDelete.addEventListener("click", () => {
      delOrder(index);
      getOrderProduct();
    });

    orderPlus.addEventListener("click", () => {
      num += 1;
    });
    orderMinus.addEventListener("click", () => {
      num -= 1;
    });
  });
}

function delOrder(index) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.splice(index, 1);
  // orders = orders.filter((el) => el.id1 !== index);
  localStorage.setItem("orders", JSON.stringify(orders));
  getOrderProduct();
}
// ? admin ////////////////////////////////////////////////////////

let card = document.querySelector(".card");
let imgFood = document.querySelector(".imgFood");
let name = document.querySelector(".name");
let price = document.querySelector(".price");
let create_btn = document.querySelector(".create_btn");
let save_btn = document.querySelector(".save_btn");

save_btn.addEventListener("click", () => {
  saveButton();
});

function saveButton() {
  let id = name.id;
  let newObj = {
    id1: Date.now(),
    name: name.value,
    price: price.value,
    imgFood: imgFood.value,
  };
  let data = JSON.parse(localStorage.getItem("food")) || [];
  data.splice(id, 1, newObj);
  localStorage.setItem("food", JSON.stringify(data));
  save_btn.style.display = "none";
  create_btn.style.display = "block";
  newProduct();

  for (let input of inputs) {
    input.value = "";
  }
}
create_btn.addEventListener("click", () => {
  if (name.value !== "" && price.value !== "" && imgFood.value !== "") {
    let obj = {
      id1: Date.now(),
      name: name.value,
      price: price.value,
      imgFood: imgFood.value,
      count: 1,
    };
    let data = JSON.parse(localStorage.getItem("food")) || [];
    data.push(obj);
    localStorage.setItem("food", JSON.stringify(data));
    newProduct();
    del();
  } else {
    alert("заполните все поля!!!");
  }
});
function del() {
  name.value = "";
  price.value = "";
  imgFood.value = "";
}

// function alphabet(letter) {
//   let letters = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "w",
//     "z",
//   ];
//   letters.map((el) => {
//    return el === letter ? idx + 1 : el;
//   }).filter(function(elem) {
//     return +elem
//   }).join('')
// }
// console.log(alphabet("f")); // --> 6
