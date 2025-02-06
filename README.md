### Parking API

This is a RESTful API built using NestJS that provides endpoints for managing parking spots, reservations, and logs. It uses PrismaClient to interact with the database and JWT to authenticate users.

### Endpoints

#### Authentication

- `POST /auth/login`: Logs in a user and returns a JWT token.
- `POST /auth/register`: Registers a new user and returns a JWT token.
- `GET /auth/verify`: Verifies the authenticity of a JWT token.

#### Parking Spots

- `POST /parking/create`: Creates a new parking spot.
- `PUT /parking/update`: Updates an existing parking spot.
- `GET /parking/`: Checks the all parking spots.
- `DEL /parking/delete`: Deletes a parking spot.

#### Reservations

- `GET /reservations/availability`: Checks the availability of parking spots for a given period.
- `POST /reservations/reserve`: Reserves a parking spot for a given period.
- `POST /reservations/cancel-reserve`: Cancels a reservation.
- `PUT /reservations/update-reserve`: Updates a reservation.
- `DELETE /reservations/delete-reserve`: Deletes a reservation.

#### Logs

- `GET /logs`: Retrieves logs for a given user.
- `POST /logs/status-vehicle`: Logs a vehicle entry or exit event.
- `PUT /logs/update-logs`: Updates a log.

Two of them dont need authentication, but the others need it.
The collections of endpoints are defined in collections folder.

### Database

The application uses PrismaClient to interact with a MongoDB and PostgreSQL.

To run the application, you need provide the following environment variables like an `.env`:

- `PORT`: The port number to run the server on.
- `MONGO_DB`: The connection string for the MongoDB database.
- `POSTGRES_DB`: The database name for the PostgreSQL database.
- `JWT_SECRET`: The secret key used to sign and verify JWT tokens.

### Install the node_modules.

```bash
npm i 
```

### After, create the database schema and seed the database with some data.




#### MongoDb

```bash
npx prisma generate --schema=prisma/mongodb/schema.prisma
npx prisma db pull --schema=prisma/mongodb/schema.prisma --force
```

#### PostgreSQL

```bash
npx prisma migrate dev --name init --schema=prisma/postgres/schema.prisma
npx prisma generate --schema=prisma/postgres/schema.prisma
npx prisma db pull --schema=prisma/mongodb/prisma/postgres/schema.prisma
```

### Start Project

```bash
npm run start 
```

## Enjoy 😊