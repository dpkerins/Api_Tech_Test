# Testing with Jest

Run "npm run test" to run tests

# Endpoints

### Players

Viewing all players

```
GET https://localhost:5000/players/

Example Response: 

[
    {
        "id": 1114,
        "first_name": "First",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 3037,
        "rank": "Silver",
        "rankedPosition": 1
    },
    {
        "id": 1115,
        "first_name": "Second",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1235,
        "rank": "Bronze",
        "rankedPosition": 2
    },
    {
        "id": 1116,
        "first_name": "Third",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 576,
        "rank": "Bronze",
        "rankedPosition": 3
    },
    {
        "id": 1117,
        "first_name": "Fourth",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 576,
        "rank": "Bronze",
        "rankedPosition": 4
    },
    {
        "id": 1118,
        "first_name": "Fifth",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 576,
        "rank": "Bronze",
        "rankedPosition": 5
    }
]

```

Viewing players by rank

```
GET https://localhost:5000/players/:rank

Example Response:

[
    {
        "id": 1115,
        "first_name": "Second",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1235,
        "rank": "Bronze",
        "rankedPosition": 2
    },
    {
        "id": 1116,
        "first_name": "Third",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 576,
        "rank": "Bronze",
        "rankedPosition": 3
    },
    {
        "id": 1117,
        "first_name": "Fourth",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 576,
        "rank": "Bronze",
        "rankedPosition": 4
    },
    {
        "id": 1118,
        "first_name": "Fifth",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 576,
        "rank": "Bronze",
        "rankedPosition": 5
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
    "id": 420,
    "winnerId": 1106,
    "loserId": 1107
}

```