# Endpoints

### Players

Viewing all players

```
GET https://localhost:5000/players/

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

```

### Matches

Adding a new match (all fields in body are required)

```
POST https://localhost:5000/matches/new/

body: {
  winnerId: int,
  loserId: int
}

```