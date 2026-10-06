let expenses = [];

function addExpense() {

    const expenseName = document.getElementById("expenseName").value;
    const expenseAmount = Number(
        document.getElementById("expenseAmount").value
    );
    const category = document.getElementById("category").value;

    if (expenseName === "" || expenseAmount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const expense = {
        name: expenseName,
        amount: expenseAmount,
        category: category
    };

    expenses.push(expense);

    displayExpenses();
    updateSummary();
    updateCategories();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

function displayExpenses() {

    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    expenses.forEach(function(expense) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.category}</td>
            <td>₹${expense.amount.toFixed(2)}</td>
        `;

        expenseList.appendChild(row);
    });
}

function updateSummary() {

    const income = Number(
        document.getElementById("income").value
    );

    let totalExpense = 0;

    expenses.forEach(function(expense) {
        totalExpense += expense.amount;
    });

    const savings = income - totalExpense;

    document.getElementById("totalIncome").textContent =
        "₹" + income.toFixed(2);

    document.getElementById("totalExpense").textContent =
        "₹" + totalExpense.toFixed(2);

    document.getElementById("savings").textContent =
        "₹" + savings.toFixed(2);
}

function updateCategories() {

    const categorySummary =
        document.getElementById("categorySummary");

    categorySummary.innerHTML = "";

    const categories = {};

    expenses.forEach(function(expense) {

        if (!categories[expense.category]) {
            categories[expense.category] = 0;
        }

        categories[expense.category] += expense.amount;
    });

    for (let category in categories) {

        const listItem = document.createElement("li");

        listItem.textContent =
            category + ": ₹" +
            categories[category].toFixed(2);

        categorySummary.appendChild(listItem);
    }
}

document.getElementById("income").addEventListener(
    "input",
    updateSummary
);