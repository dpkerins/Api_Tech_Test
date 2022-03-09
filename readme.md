# Endpoints

### Players

Viewing all players

```
GET https://localhost:5000/players/

Example Response: 

[
    {
        "id": 1106,
        "first_name": "Another",
        "last_name": "Person",
        "nationality": "Germany",
        "dob": "1985-10-11T23:00:00.000Z",
        "score": 1200,
        "rank": "Unranked",
        "rankedPosition": 1
    },
    {
        "id": 1107,
        "first_name": "Some",
        "last_name": "Person",
        "nationality": "Zimbabwe",
        "dob": "1990-06-13T23:00:00.000Z",
        "score": 1200,
        "rank": "Unranked",
        "rankedPosition": 2
    }
]

```

Viewing players by rank

```
GET https://localhost:5000/players/:rank

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