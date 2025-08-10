Grants Management System - API & Smart Contract

This project is a monorepo containing a comprehensive system for managing research grants, leveraging a Soroban smart contract on the Stellar network and a NestJS API for orchestration and off-chain data management.

## Table of Contents
1.  [Project Overview](#project-overview)
2.  [Tech Stack](#tech-stack)
3.  [Project Structure](#project-structure)
4.  [Prerequisites](#prerequisites)
5.  [Setup and Installation (Docker)](#setup-and-installation-docker-recommended)
6.  [Setup and Installation (Local)](#setup-and-installation-local)
7.  [Running the Application](#running-the-application)
8.  [Database Migrations](#database-migrations)
9.  [Running Tests](#running-tests)
10. [API Endpoints](#api-endpoints)

## Project Overview

This system provides a robust backend to interact with a "Grants" smart contract deployed on Soroban. The NestJS API serves as a middleware, handling user data, linking off-chain information to on-chain grants, and building transactions that can then be signed and submitted by a client.

-   **On-Chain Logic (Soroban):** Manages the core grant lifecycle, including creation, milestone approvals, and payments.
-   **Off-Chain Logic (NestJS API):** Manages user and institutional data, provides an easy-to-use REST API, and constructs transaction XDRs for clients.

## Tech Stack
-   **Backend API:** [NestJS](https://nestjs.com/), TypeScript, TypeORM
-   **Database:** PostgreSQL
-   **Smart Contract:** Rust, [Soroban](https://soroban.stellar.org/)
-   **Containerization:** Docker, Docker Compose

## Project Structure

This is a monorepo containing two main projects:

-   `./api`: The NestJS REST API.
-   `./contracts/beca`: The Soroban smart contract written in Rust.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Yarn](https://yarnpkg.com/)
-   [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
-   [Rust](https://www.rust-lang.org/) & [Cargo](https://doc.rust-lang.org/cargo/)
-   [soroban-cli](https://soroban.stellar.org/docs/getting-started/setup#install-the-soroban-cli)

## Setup and Installation (Docker Recommended)

Using Docker is the simplest and most reliable way to get the API and database running.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd beca_manager
    ```

2.  **Create an Environment File:**
    Navigate to the `api` directory and create a `.env` file from the example. If `.env.example` doesn't exist, create `.env` manually.
    ```bash
    cd api
    touch .env
    ```
    Now, fill in the `api/.env` file with your database credentials and Soroban contract details. It should look like this:
    ```env
    # Server Port
    PORT=3000

    # Soroban Configuration
    SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
    SOROBAN_CONTRACT_ID=YOUR_CONTRACT_ID_HERE
    SOROBAN_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"

    # Database Configuration
    DB_HOST=db # Important: use the service name from docker-compose.yml
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=your_postgres_password
    DB_DATABASE=grants
    ```

3.  **Build and Run with Docker Compose:**
    From the **root directory** of the project (`beca_manager`), run:
    ```bash
    docker-compose up --build
    ```
    This command will:
    -   Build the `api` Docker image.
    -   Create and start containers for the API and the PostgreSQL database.
    -   The API will be available at `http://localhost:3000`.

## Setup and Installation (Local)

1.  **Install API Dependencies:**
    ```bash
    cd api
    yarn install
    ```

2.  **Setup Environment File:**
    Create and configure your `api/.env` file as described in the Docker setup, but make sure `DB_HOST` is set to `localhost`.

3.  **Run PostgreSQL:**
    Ensure you have a local PostgreSQL instance running and that the credentials match your `.env` file.

4.  **Build and Run Smart Contract:**
    ```bash
    cd ../contracts/beca
    soroban contract build
    # Deploy the contract to get a contract ID and add it to your .env file
    ```
5.  **Run Database Migrations:**
    First, ensure you have run a build.
    ```bash
    cd api
    yarn build
    yarn migration:run
    ```


## Running the Application

-   **With Docker:**
    ```bash
    docker-compose up
    ```

-   **Locally (for API):**
    ```bash
    cd api
    yarn start:dev
    ```

## Database Migrations

Migrations are managed by TypeORM. First, build the project to ensure the `dist` folder is up to date.

```bash
cd api
yarn build

Generate a new migration:
(After making changes to your entities)
```bash
yarn migration:gen -- src/migrations/YourMigrationName
```

Run pending migrations:
```bash
yarn migration:run
```

Run migrations with Docker:
(If the container is already running)
```bash
docker-compose exec api yarn migration:run
```

Revert the last migration:
```bash
yarn migration:revert
```

## Running Tests

Run API unit tests locally:
```bash
cd api
yarn test
```

Run API unit tests with Docker:
```bash
docker-compose exec api yarn test
```

## API Endpoints

You can see the full interactive documentation at `http://localhost:3000/api-docs` when the application is running.

### `GET /grants/{grantId}`

Get full on-chain and off-chain grant details.

**URL Parameters:**

-   `grantId` (string): The on-chain ID of the grant.

**Success Response (200 OK):**
```json
{
  "onChain": {
    "name": "On-Chain Grant Name",
    "manager": "G...",
    "supervisor": "G...",
    "researcher": "G..."
  },
  "offChain": {
    "id": 1,
    "funderInstitutionName": "My Funding Body",
    "onChainId": "12345"
  }
}
```

### `GET /grants/{grantId}/milestones/{milestoneId}`

Get full details for a specific milestone.

**URL Parameters:**

-   `grantId` (string): The on-chain ID of the grant.
-   `milestoneId` (number): The numerical ID of the milestone.

**Success Response (200 OK):**
```json
{
  "name": "Milestone 1: Research",
  "description": "Initial phase of the research.",
  "state": "Pending",
  "approvers": [
    { "address": "G...", "role": "Manager", "name": "Manager Name" }
  ],
  "participants": {
    "manager": { "address": "G...", "name": "Manager Name" },
    "supervisor": { "address": "G...", "name": "Supervisor Name" },
    "researcher": { "address": "G...", "name": "Researcher Name" }
  }
}
```

### `POST /grants/build/create`

Create a grant record off-chain and build the on-chain transaction XDR.

**Request Body (JSON):**
```json
{
  "funder": "G...",
  "manager": "G...",
  "supervisor": "G...",
  "researcher": "G...",
  "name": "Grant Name from Client",
  "total_amount": "10000000",
  "total_milestones": 3,
  "funderInstitutionName": "Client Institution Name",
  "managerName": "Client Manager",
  "managerEmail": "manager@client.com",
  "supervisorName": "Client Supervisor",
  "supervisorEmail": "supervisor@client.com",
  "researcherName": "Client Researcher",
  "researcherEmail": "researcher@client.com"
}
```

**Success Response (201 Created):**
```json
{
  "databaseId": 1,
  "transaction": "AAAAAgAAAA...TransactionXDR...AAAA"
}
```

### `POST /grants/build/register-milestone`

Build the XDR for registering a new milestone.

**Request Body (JSON):**
```json
{
  "manager": "G...",
  "grant_id": "12345",
  "name": "Milestone 2: Development",
  "description": "Build the prototype."
}
```

**Success Response (200 OK):**
```json
{
  "transaction": "AAAAAgAAAA...TransactionXDR...AAAA"
}
```

### `POST /grants/build/approve-milestone`

Build the XDR for approving a milestone.

**Request Body (JSON):**
```json
{
  "signer": "G...",
  "grant_id": "12345",
  "milestone_id": 1
}
```

**Success Response (200 OK):**
```json
{
  "transaction": "AAAAAgAAAA...TransactionXDR...AAAA"
}
```

### `POST /grants/build/claim-payment`

Build the XDR for claiming a milestone payment.

**Request Body (JSON):**
```json
{
  "claimer": "G...",
  "grant_id": "12345",
  "milestone_id": 1
}
```

**Success Response (200 OK):**
```json
{
  "transaction": "AAAAAgAAAA...TransactionXDR...AAAA"
}
```

