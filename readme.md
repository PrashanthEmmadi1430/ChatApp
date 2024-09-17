
# 💬 Chat Application

Welcome to the Chat Application! This project is a real-time chat app that allows users to register, log in, and communicate with each other. It features user authentication, profile management, and live messaging.


## 🌐 Live Demo

Check out the live version of the chat application [here](https://your-deployed-app-url.com)!



## 🚀 Features

- **User Registration & Login**: Secure user authentication with profile management.
- **Real-Time Messaging**: Instant messaging with online status updates.
- **Profile Management**: Upload and display user profile pictures.
- **Responsive Design**: Optimized for various screen sizes.

## 🖥️ Frontend

The frontend of the chat application is built with **React** and **Tailwind CSS** for a modern and responsive design.

### 📁 Components

- **`App`**: The root component that renders the `Toaster` for notifications and the `Outlet` for routing.
- **`AuthLayOut`**: Layout component for authentication pages, including headers and main content areas.
- **`Register`**: Registration page for new users, including profile picture upload.
- **`Login`**: Login page for existing users to access their accounts.
- **`Home`**: Main page for logged-in users, featuring a sidebar and a message area.
- **`Message`**: Component for viewing and sending messages to other users.
- **`Avatar`**: Component displaying user avatars with online status indicators.

### 🌐 Routing

Routes are managed using `createBrowserRouter` from `react-router-dom`:

- **`/register`**: Registration page.
- **`/login`**: Login page.
- **`/:userId`**: Messaging interface for a specific user.

### 📦 State Management

- **Redux**: For handling global state, including user details, authentication tokens, online users, and socket connections.

## 🔙 Backend

The backend is powered by **Node.js** and **Express**, providing the server-side logic for user authentication and real-time communication.

### 🛠️ Endpoints

- **`POST /api/register`**: Register a new user with email, name, password, and an optional profile picture.
- **`POST /api/login`**: Authenticate a user and return a JWT token.
- **`GET /api/user-details`**: Retrieve user details using the token from the request.
- **WebSocket**: Handles real-time updates and user connections via Socket.io.

### 🔒 Middleware

- **Authentication**: Protects routes requiring a valid token.
- **Socket.io**: Manages real-time messaging and user presence updates.

## ⚙️ Setup

### Frontend

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/PrashanthEmmadi1430/ChatApp
   ```

2. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Create Environment File**:
   Create a `.env` file in the `frontend` directory and add:
   ```plaintext
   REACT_APP_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   REACT_APP_BACKEND_URL=<your-backend-url>
   REACT_APP_BACKGROUND_IMG=<background-image-url>
   ```

5. **Start the Development Server**:
   ```bash
   npm start
   ```

### Backend

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/PrashanthEmmadi1430/ChatApp
   ```

2. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Create Environment File**:
   Create a `.env` file in the `backend` directory and add:
   ```plaintext
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_UPLOAD_PRESET=<your-cloudinary-upload-preset>
   JWT_SECRET=<your-jwt-secret>
   ```

5. **Start the Server**:
   ```bash
   npm start
   ```



## 🏃‍♂️ Running the Application

1. **Start the Backend Server**: Ensure the backend server is running and accessible.
2. **Start the Frontend Application**: Launch the React application.

Visit `http://localhost:3000` in your browser to interact with the chat application.



## 📜 License

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for more details.

