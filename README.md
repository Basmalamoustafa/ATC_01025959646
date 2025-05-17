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
  - Create / edit / delete events (including image upload via drag‑and‑drop)  
  - View & promote users to admin  
  - Paginated event management table  

- **File Uploads**
  - Multer‑powered image uploads  
  - Static serving of uploaded images  

- **Responsive & Accessible UI**
  - React + React‑Bootstrap  
  - Dark mode toggle (hook + CSS)  
  - Toast notifications via React‑Toastify  

- **API Tests**
  - Jest & Supertest covering auth, booking, event, and user controllers  
  - In‑memory or sandboxed test DB  

---

## Getting Started

### Prerequisites

- Node.js (>=14) & npm  
- MongoDB instance (local or Atlas)  
- [Optional] MongoDB Compass for GUI  

### Installation

```bash
# Clone the repo
git clone https://github.com/Basmalamoustafa/ATC_01025959646
cd event-booking-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
