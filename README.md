# Test task "anonymous buyers"

Task details you can see [here](https://topcreator.notion.site/Middle-Senior-Backend-Developer-4efaba729c5047c386dcf059f86e779e)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Docker](https://www.docker.com/products/docker-desktop) (including Docker Compose)
- [Node.js](https://nodejs.org/) (if you need to work with the code locally)
- [npm](https://www.npmjs.com/get-npm)  (for managing dependencies)

## Getting Started

### Cloning the Repository

```bash
git clone https://github.com/Daniil-Khlyvniuk/anonymous-buyers.git
cd anonymous-buyers
```

### Configuration
Make sure to create a `.env` file in the root directory based on the `.env.template` file provided. This file will contain environment-specific variables used by Docker Compose.

### Docker Compose Setup
1. Build and Start Containers
To build and start the containers, use the following command:
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker images as specified in the `Dockerfile` and start the containers defined in `docker-compose.yml`.

2. Accessing the Application
   - By default, the Express server will be accessible at `http://localhost:4000`. 
   - MongoDB will be running on `mongodb://host.docker.internal:27017/?replicaSet=rs0`.

3. Stopping Containers
   To stop the containers, press `Ctrl+C` in the terminal where docker-compose is running or use:
    ```bash
    docker-compose down
    ```
## Development
1. Running Tests

   To run the tests, ensure the containers are up and use:
    ```bash
    cd anonymous-buyers && npm run test
    ```
