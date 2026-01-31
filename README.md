# Time-Based Access Window System

**Assignment ID:** FSD-36 
**Title:** Time-Based Access Window System

## Project Overview
This project is a Full Stack application designed to implement a **Time-Based Access Window System**. The objective is to design a system that allows administrators to grant users access to protected resources only within a defined time window.

The system enforces strict time-based validation where access attempts outside the assigned window are rejected. All access data is persisted in a database, ensuring no hardcoded or in-memory logic is used.

##  Live Deployment Links

* **Frontend Deployment:** Not yet Deployed
* **Backend Deployment:** 

## Tech Stack
* **Backend:** Node.js, Express.js (v5) 
* **Database:** MongoDB, Mongoose 
* **Authentication:** JWT (JSON Web Tokens), bcryptjs
* **Frontend:** React.js (Vite), Axios

## User Roles and Permissions

### 1. ADMIN 
* **Register & Login:** Secure access to the system.
* **Access Management:** Define specific access start and end times for users.
* **Monitoring:** View user lists and access logs.

### 2. USER 
* **Register & Login:** Secure authentication.
* **View Status:** View their currently assigned access window.
* **Resource Access:** Attempt to access protected resources.
 * **Business Rule:** Access is granted **only** if the current server time is within the assigned window. Attempts outside this window are rejected.

##  API Endpoints
*Key endpoints for the application:*

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new User or Admin |
| `POST` | `/api/auth/login` | Authenticate and receive JWT |

### Admin Operations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/users` | List all users |
| `PUT` | `/api/admin/set-window/:id` | Set access start/end time for a user |

### Resource Access
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/resource/status` | View own access window |
| `GET` | `/api/resource/protected-data` | Access restricted content (Time-validated) |

##  Database Schema
The application uses a **User** model to store credentials and access windows.

```json
{
  "_id": "ObjectId",
  "username": "String (Unique)",
  "password": "String (Hashed)",
  "role": "String ('user' | 'admin')",
  "accessStart": "Date (Timestamp)",
  "accessEnd": "Date (Timestamp)"
}
