# Event Booking System

A full-stack web application for browsing, booking, and managing events. Users can register, log in, browse events, book tickets, and view their bookings. Admins can create, edit, delete events, and promote users.

---

## Features

- **User Authentication**  
  - JWT-based registration & login  
  - Role-based access: `user` vs. `admin`  

- **Event Browsing & Booking**  
  - Public event listings with pagination, categories & tags  
  - “Book Now” button (per-button loading state)  
  - Permanently marked “Booked” events  
  - Congratulations screen upon successful booking  

- **Admin Panel**  
  - Create / edit / delete events (including image upload via drag-and-drop)  
  - View & promote users to admin  
  - Paginated event management table  

- **File Uploads**  
  - Multer-powered image uploads  
  - Static serving of uploaded images  

- **Responsive & Accessible UI**  
  - React + React-Bootstrap  
  - Dark mode toggle (hook + CSS)  
  - Toast notifications via React-Toastify  

- **Internationalization**  
  - English & Arabic (RTL) support via `react-i18next`  

- **API Tests**  
  - Jest & Supertest covering auth, booking, event, and user controllers  
  - In-memory or sandboxed test DB  

---

## Getting Started

### Prerequisites

- Node.js (>=14) & npm  
- MongoDB instance (local or Atlas)  
- [Optional] MongoDB Compass for GUI  

### Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Basmalamoustafa/ATC_01025959646
   cd event-booking-system

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install

---

## Development

### Start Backend

1.  ```bash
    cd backend
    npm run dev
    
### Start Frontend

1.  ```bash
    cd frontend
    npm start

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001/api

---

## Testing
1. ```bash
    cd backend
    npm test
- Uses Jest & Supertest
- Tests are located in backend/tests/

---

## Deployment
The application is deployed and live at:

- Frontend (Client):
https://full-event-booker.onrender.com
- Backend (API):
https://event-booker-weou.onrender.com

---

## Default Admin Account

- **To log in as an administrator out of the box, use the following credentials:**

  - Email: bas@gmail.com
  - Password: 123456

___

## Folder Structure
```bash
event-booking-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── uploads/        # Uploaded images
│   ├── tests/          # Jest & Supertest
│   ├── package.json
│   └── jest.config.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   └── api.js
    ├── public/
    └── package.json


