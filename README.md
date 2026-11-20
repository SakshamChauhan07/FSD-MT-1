# Event Registration Management API

## Project Description
A REST API developed using Node.js and Express.js
to manage college event registrations.

## Technologies Used
- Node.js
- Express.js
- JavaScript
- Postman

## Installation

1. Clone the repository.
2. Open the project folder.
3. Install dependencies:

```bash
npm install
```

## Run the Server

```bash
node server.js
```

Server runs at:

http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/registrations | Get all registrations |
| POST | /api/registrations | Add registration |
| GET | /api/registrations/:id | Get by ID |
| PUT | /api/registrations/:id | Update registration |
| DELETE | /api/registrations/:id | Delete registration |
| GET | /api/registrations/filter?department=CSE | Filter by department |
| GET | /api/registrations/pending | Get pending registrations |

## Storage

All records are stored in an in-memory JavaScript array.

No database is used.