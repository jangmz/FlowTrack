# FlowTrack
Inventory application for renting devices.

## Backend (REST API)
This web API is made with Express, PostgreSQL database and Prisma ORM. API can manipulate data (CRUD) for devices, users and history. Sign up, log in and authentication is also handled with implemented JWT. 
When manipulating devices, users and history data, access token needs to be sent via authorization header.

### Installation
To run this application locally:
1. clone the repository
2. install dependencies with `npm install`
3. create .env file with database credentials and other neccessary information:
    - `PORT=5000`
    - `ACCESS_TOKEN_SECRET=[enter your secret]`
    - `REFRESH_TOKEN_SECRET=[enter your secret]`
    - `DATABASE_URL=postgresql://[user]:[password]@localhost:5432/[database_name]?schema=public`
4. migrate database: `npx prisma migrate dev` -> `npx prisma generate`
5. start the development server: `npm run dev`

### Routes
Token is sent in Authorization header ( Authorization: Bearer [token] )

#### AUTH (JWT)
- POST /auth/sign-up -> creates new user account
    { fullName, role, username, password1, password2, email }
- POST /auth/log-in -> creates an access and refresh token for user
    { username, password }
- DELETE /auth/log-out -> deletes JWT refresh token from DB
- POST /auth/token -> regenerates a new access token from refresh token
    { token }

#### USERS
- GET /api/users -> returns all users
- POST /api/users -> inserts user in DB
    { fullName, role, username, password1, password2, email }
- DELETE /api/users/:userId -> deletes user from DB
- PUT /api/users/:userId -> updates user data in DB
    { fullName, role, username, password1, password2, email }

#### DEVICES
- GET /api/devices -> returns all devices from DB
- POST /api/devices -> inserts a device
    { deviceType, model, serialNumber, inventoryNumber, status }
- DELETE /api/devices/:deviceId -> deletes a device from DB
- PUT /api/devices/:deviceId -> updates device data in DB
    { deviceType, model, serialNumber, inventoryNumber, status }

#### HISTORY
- GET /api/history -> returns all rent history
- POST /api/history -> inserts new history data
    { deviceId, userId, rentDate, returnDate }
- DELETE /api/history/:historyId -> deletes history input

### Technologies used
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)\
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)\
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)\
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)\
![Debian](https://img.shields.io/badge/Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white)\
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)\
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)