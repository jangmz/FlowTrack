# FlowTrack
Inventory application for renting devices.

## Frontend (React Application)
This is the frontend of FlowTrack, built using React and Vite. It provides a user-friendly interface to manage inventory, track rentals, and interact with the backend API.

### Installation
To run this application locally:
1. Clone the repository.
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies with `npm install`.
4. Create a `.env` file in the root of the frontend directory with the following variables:
    - `VITE_API_URL=http://localhost:5000` (or your backend URL)
5. Start the development server: `npm run dev`

### Features
- User authentication (JWT-based login/logout)
- Inventory management (CRUD operations on devices)
- Rental history tracking
- Client management
- CSV import/export functionality

## Screenshots
### Home page
![flowtrack_home](https://github.com/user-attachments/assets/f6b4dfc7-b421-4492-943f-c6d706d7b12c)
### Devices List (laptops)
![flowtrack_devices](https://github.com/user-attachments/assets/e27ae33a-0347-45ff-a0a8-a2a2f5c0f14a)
### History Log
![flowtrack_history](https://github.com/user-attachments/assets/3add3ccb-175c-4752-83c8-fdb71294fad0)
### Clients List
![flowtrack_clients](https://github.com/user-attachments/assets/efbc73b8-a2bc-459d-83b4-43e209b350cd)
### Edit device
![flowtrack_editdevice](https://github.com/user-attachments/assets/dc50b165-bbef-40c0-a0b6-deff9fd58c34)

## Backend (REST API)
This web API is made with Express, PostgreSQL database, and Prisma ORM. The API handles CRUD operations for devices, users, history, and clients. Authentication is implemented using JWT.

### Installation
To run this application locally:
1. Clone the repository.
2. Navigate to the backend directory: `cd backend`
3. Install dependencies with `npm install`.
4. Create a `.env` file with database credentials and other necessary information:
    - `PORT=5000`
    - `ACCESS_TOKEN_SECRET=[enter your secret]`
    - `REFRESH_TOKEN_SECRET=[enter your secret]`
    - `DATABASE_URL=postgresql://[user]:[password]@localhost:5432/[database_name]?schema=public`
5. Migrate the database:
    - `npx prisma migrate dev`
    - `npx prisma generate`
6. Start the development server: `npm run dev`

### API Routes
#### AUTH (JWT)
- `POST /auth/sign-up` → Creates new user account.
- `POST /auth/log-in` → Generates access and refresh tokens.
- `DELETE /auth/log-out` → Deletes refresh token.
- `POST /auth/token` → Refreshes access token.

#### USERS
- `GET /api/users` → Returns all users.
- `POST /api/users` → Creates a new user.
- `DELETE /api/users/:userId` → Deletes a user.
- `PUT /api/users/:userId` → Updates user data.

#### DEVICES
- `GET /api/devices` → Returns all devices.
- `POST /api/devices` → Creates a new device.
- `DELETE /api/devices/:deviceId` → Deletes a device.
- `PUT /api/devices/:deviceId` → Updates device data.

#### HISTORY
- `GET /api/history` → Returns rental history.
- `POST /api/history` → Adds new history entry.
- `DELETE /api/history/:historyId` → Deletes a history entry.

#### CLIENTS
- `GET /api/clients` → Returns all clients.
- `POST /api/clients` → Creates a new client.
- `PUT /api/clients/:clientId` → Updates client data.
- `DELETE /api/clients/:clientId` → Deletes a client.
- `POST /api/clients/import` → Imports clients from CSV.
- `GET /api/clients/export` → Exports clients to CSV.

### Technologies Used
![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Debian](https://img.shields.io/badge/Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

---
This project is actively maintained and improved. Contributions are welcome!
