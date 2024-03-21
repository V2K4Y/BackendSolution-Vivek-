**Customer Request Application**

**Overview**

This application is designed to manage customer requests with robust authentication and authorization mechanisms. Users can submit new requests, while admins have access to a dedicated section for managing the request lifecycle (pending, in progress, resolved).

**Features**

- **User Authentication:** Users can register and log in using a secure JWT-based authentication system with cookie support for session management.
- **Authorization:**
    - Users can only submit new customer requests.
    - Admins can view all customer requests and update their status (pending, in progress, resolved).
- **Customer Request Management:**
    - Users can submit customer requests, providing details and optionally attaching files.
    - Files are handled using Multer in the backend and their paths are stored in a MongoDB database.
- **Admin Panel:**
    - Admins can access a dedicated section to view all customer requests (any username which consist of 'admin' will be assigned as admin).
    - They can update the status of requests (pending, in progress, resolved).

**Getting Started**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/V2K4Y/BackednSolution-Vivek-.git
   ```

2. **Install Dependencies:**

   - Open a terminal in the project directory.
   - Run `yarn` to install all project dependencies.

3. **Run the Application:**

   - Navigate to the `api` directory.
   - Run `yarn` to install dependencies for the backend.
   - **Important:** Create a `.env` file in the `api` directory (not version-controlled) and add the following environment variables:
     ```
     PORT=your_port_number (e.g., 5000) preffered 4000 as it is hardset to port:4000 (you can change accordingly) on frontend
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key_for_jwt_tokens
     ```
   - In the `api` directory, run `yarn start` to start the backend server.

   - In the root directory of the project, run `yarn dev` to start the frontend development server.

4. **Access the Application:**

   - The application will be available at `http://localhost:<your_port_number` (usually http://localhost:5173).

**Additional Notes**

- Ensure you have Git and Node.js (with npm or yarn) installed on your machine.
- Replace `<your_port_number>` with a preferred port number (default is 5173).
- Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.
- Replace `<your_secret_key_for_jwt_tokens>` with a strong secret key to be used for JWT generation and validation.
