# Backend Application

This is mini backend application designed to manage user orders, products, and user authentication. It utilizes Node.js, Express, and MySQL, and is containerized using Docker. Note that there is no front-end.

## Getting Started

The instructions below will get you a copy of the project up and running on your local machine. 

### Prerequisites

- Docker
- Docker Compose
- Node.js (if running locally without Docker)


### Installing and Running with Docker

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/backend_finals.git
    cd backend_finals
    ```

2. **Build and Run the Docker containers**
    ```bash
    docker-compose up --build
    ```

    This command will build the application and start all services specified in `docker-compose.yml`, including the database and the application server.

3. **Access the application**

    The application will be accessible at `http://localhost:3003` (or whichever port you configured).

### Environment Variables

Ensure you have the following environment variables configured in a `.env` file or in your environment:

- `DB_HOST` - Hostname for the database
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT token generation

### Security Features

This application includes several security features:

- **JWT Authentication**: Secures endpoints by requiring a valid JWT token for access, ensuring that users can only access resources they are authorized to.
- **Encrypted Passwords**: User passwords are hashed before storing in the database, enhancing the security of user data.
- **Input Validation**: Inputs are validated before processing to prevent common security issues such as SQL injection and cross-site scripting (XSS).


## Acknowledgments

- Massive thanks to Ko Joseph for this semester!! None of us could do it without you!