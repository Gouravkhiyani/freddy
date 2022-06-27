const ebalance = document.getElementById("balance");
const emoneyPlus = document.getElementById("money-plus");
const emoneyMinus = document.getElementById("money-minus");
const elist = document.getElementById("expenselist");
const eform = document.getElementById("expenseform");
const etext = document.getElementById("etext");
const eamount = document.getElementById("eamount");
const enotification = document.getElementById("notification");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];

let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

transactions =
  localStorageTransactions !== null ? localStorageTransactions : [];

function updateLocaleStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function showNotification() {
  enotification.classList.add("show");
  setTimeout(() => {
    enotification.classList.remove("show");
  }, 2000);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransaction(e) {
  e.preventDefault();
  if (etext.value === ' ' || eamount.value === ' ') {
    showNotification();
  } else {
    const transaction = {
      id: generateID(),
      text: etext.value,
      amount: +eamount.value,
    };
    // console.log(transaction)
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocaleStorage();
    etext.value = "";
    eamount.value = "";
  }
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(sign === "+" ? "plus" : "minus");
  item.innerHTML = `
          ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span
          ><button class="delete-btn" onclick="removeTransaction(${
            transaction.id
          })"><i class="fa fa-times"></i></button>
    `;
  elist.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const income = amounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter((value) => value < 0)
      .reduce((accumulator, value) => (accumulator += value), 0) * -1
  ).toFixed(2);
  ebalance.innerText = `$${total}`;
  emoneyPlus.innerText = `$${income}`;
  emoneyMinus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  // console.log(transactions);
  updateLocaleStorage();
  init();
}

// Init
function init() {
  elist.innerHTML = "";
  // for(let i=0;i<transactions.length;i++)
  // {
  //   console.log(transactions[i]);
  //     addTransactionDOM(transactions[i]);
  // }
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

eform.addEventListener("submit", addTransaction);
