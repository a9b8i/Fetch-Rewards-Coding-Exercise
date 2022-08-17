const express = require('express');
const app = express();

//Parse incoming requests
app.use(express.json());

//Tracks payers and their balance
let users = {};

// all transactions wil be stored in this array
const Transactions = [];


//Add Points
app.post("/addtransaction", (req, res) => {

    Transactions.push(req.body);

    //Sort the array everytime a new transaction is added
    Transactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

    //Update the user object
    if (!users[req.body.payer]) {
        users[req.body.payer] = 0;
    }
    users[req.body.payer] += req.body.points;


    res.json(Transactions);

});



//Spend Points
app.post("/spend", (req, res) => {
    let totalPoints = 0;
    let deductPoints = req.body.points;
    let result = []

    Transactions.forEach((transaction) => {
        totalPoints += transaction.points;
    })

    //Check if available balance is sufficient
    if (deductPoints > totalPoints) {

        return res.json({ message: "Insufficient points" });

    } else {
        
        let tempUser = {};
        let spendingAmount = req.body.points;
        let anotherSpendingAmount = req.body.points;

        //Get all the payers and amount that needs to be deducted from each and store in a temporary object
        for (let index = 0; index < Transactions.length; index++) {
            let transaction = Transactions[index];
            if (spendingAmount > transaction.points) {
                if (!tempUser[transaction.payer]) tempUser[transaction.payer] = 0;
                tempUser[transaction.payer] += transaction.points
                users[transaction.payer] -= transaction.points;
                spendingAmount -= transaction.points;
            }
            else {
                if (!tempUser[transaction.payer]) tempUser[transaction.payer] = 0;
                tempUser[transaction.payer] += spendingAmount
                users[transaction.payer] -= spendingAmount;
                break
            }

        }

        //Create an object for each payer with minus sign before amount being deducted and push into result array
        for (let key in tempUser) {
            if (tempUser[key] > 0) {
                result.push({ "payer": key, "points": (tempUser[key] * -1) })
            }

        }

        //Update Transactions array
        for (let i = 0; i < Transactions.length; i++) {

            if (anotherSpendingAmount >= Transactions[i].points) {
                anotherSpendingAmount -= Transactions[i].points;
                Transactions[i].points = 0;
            } else {
                Transactions[i].points -= anotherSpendingAmount;
                break;
            }
        }

    }

    res.json(result)

})


//Get Points
app.get("/points", (req, res) => {

    res.json(users);
})



const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))
