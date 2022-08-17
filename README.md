# Fetch Rewards Coding Exercise - Backend Software Engineering

This Project was built using Node.js and Express.js


# Software needed to test this project

1.   Node.js https://nodejs.org/en/
2.   Postman https://www.postman.com/


# Instructions

1. Download or clone the repository onto your computer
2. Navigate into the project's directory
3. Run `npm install` to install the project's dependencies
4. Run `npm start` to start project on localhost:3000


# Assumptions

1. One transaction is added at a time
2. The body of the request is made with JSON and has the correct format


# Examples



## Add Transaction
`POST` `http://localhost:3000/addtransaction`


Request:
- { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
- { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }
- { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }

Response:
```
[
    {
        "payer": "UNILEVER",
        "points": 200,
        "timestamp": "2020-10-31T11:00:00Z"
    },
    {
        "payer": "MILLER COORS",
        "points": 10000,
        "timestamp": "2020-11-01T14:00:00Z"
    },
    {
        "payer": "DANNON",
        "points": 1000,
        "timestamp": "2020-11-02T14:00:00Z"
    }
]
```

## Spend Points
`POST` `http://localhost:3000/spend`

Request made with:
- { "points": 5000 }

Response:
```
[
    {
        "payer": "UNILEVER",
        "points": -200
    },
    {
        "payer": "MILLER COORS",
        "points": -4800
    }
]
```

## Get Points
`GET` `http://localhost:3000/points`

Response:
```
{
    "DANNON": 1000,
    "UNILEVER": 0,
    "MILLER COORS": 5200
}
```
