git clone https://github.com/your-username/contact-manager.git
cd contact-manager
 
### 1. Backend setup
cd contact
npm install
npm run dev
By default, the backend runs at http://localhost:5000
 
### 2. Frontend Setup
cd frontend
npm install
npm start
By default, the frontend runs at http://localhost:3000
 
### Environment Variables
**Backend (contact/.env)**
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
 
**Frontend (frontend/.env)**
   REACT_APP_API_URL=http://localhost:5000
 
---
 
This version has:  
- Setup instructions (frontend + backend)  
- Environment variables  
- Scripts  
