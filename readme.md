# General

* API was built with Javascript, Express, SQLite, Prisma (ORM), and Jest (Testing)

### To run code

* Run 'npm install' to install dependencies
* Run 'npm start' to run API on server at http://localhost:5000

### Testing with Jest

* Run "npm run test" to run tests

# Endpoints

### Players

Viewing all players

```
GET https://localhost:5000/players/

Example Response: 

[
    {
        "id": 2,
        "first_name": "Another",
        "last_name": "Guy",
        "nationality": "China",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1610,
        "rank": "Bronze",
        "rankedPosition": 1,
        "age": 31
    },
    {
        "id": 40,
        "first_name": "Fourth",
        "last_name": "Guy",
        "nationality": "Albania",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1200,
        "rank": "Bronze",
        "rankedPosition": 2,
        "age": 31
    },
    {
        "id": 1,
        "first_name": "New",
        "last_name": "Guy",
        "nationality": "Germany",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 990,
        "rank": "Bronze",
        "rankedPosition": 3,
        "age": 31
    },
    {
        "id": 39,
        "first_name": "Third",
        "last_name": "Guy",
        "nationality": "China",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 900,
        "rank": "Bronze",
        "rankedPosition": 4,
        "age": 31
    },
    {
        "id": 41,
        "first_name": "First",
        "last_name": "Guy",
        "nationality": "Germany",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1200,
        "rank": "Unranked",
        "rankedPosition": 5,
        "age": 31
    }
]

```

Viewing players by rank and/or nationality

```
GET https://localhost:5000/players?rank=[]&nationality=[]
*can include either or both rank and nationality

Example Response:

[
    {
        "id": 2,
        "first_name": "Another",
        "last_name": "Guy",
        "nationality": "China",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1610,
        "rank": "Bronze",
        "rankedPosition": 1,
        "age": 31
    },
    {
        "id": 40,
        "first_name": "Fourth",
        "last_name": "Guy",
        "nationality": "Albania",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1200,
        "rank": "Bronze",
        "rankedPosition": 2,
        "age": 31
    },
    {
        "id": 1,
        "first_name": "New",
        "last_name": "Guy",
        "nationality": "Germany",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 990,
        "rank": "Bronze",
        "rankedPosition": 3,
        "age": 31
    },
    {
        "id": 39,
        "first_name": "Third",
        "last_name": "Guy",
        "nationality": "China",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 900,
        "rank": "Bronze",
        "rankedPosition": 4,
        "age": 31
    }
]

```
Adding a new player (all fields in body are required)

```
POST https://localhost:5000/players/new

body: {
  first_name: string,
  last_name: string,
  nationality: string,
  dob: string
}

Example Response:
{
    "id": 1107,
    "first_name": "Some",
    "last_name": "Person",
    "nationality": "Zimbabwe",
    "dob": "1990-06-13T23:00:00.000Z",
    "score": 1200,
    "rank": "Unranked"
}

```

### Matches

Adding a new match (all fields in body are required)

```
POST https://localhost:5000/matches/new/

body: {
  winnerId: int,
  loserId: int
}

Example Response: 

{
    "id": 54,
    "winnerId": 1,
    "loserId": 2,
    "winner": {
        "id": 1,
        "first_name": "New",
        "last_name": "Guy",
        "nationality": "Germany",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1151,
        "rank": "Bronze",
        "winners": [
            {
                "id": 51,
                "winnerId": 1,
                "loserId": 2
            },
            {
                "id": 52,
                "winnerId": 1,
                "loserId": 2
            },
            {
                "id": 54,
                "winnerId": 1,
                "loserId": 2
            }
        ],
        "losers": [
            {
                "id": 53,
                "winnerId": 2,
                "loserId": 1
            }
        ]
    },
    "loser": {
        "id": 2,
        "first_name": "Another",
        "last_name": "Guy",
        "nationality": "China",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1449,
        "rank": "Bronze",
        "winners": [
            {
                "id": 53,
                "winnerId": 2,
                "loserId": 1
            }
        ],
        "losers": [
            {
                "id": 51,
                "winnerId": 1,
                "loserId": 2
            },
            {
                "id": 52,
                "winnerId": 1,
                "loserId": 2
            },
            {
                "id": 54,
                "winnerId": 1,
                "loserId": 2
            }
        ]
    }
}

```