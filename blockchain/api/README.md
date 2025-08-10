Grants Management System - API & Smart Contract

This project is a monorepo containing a comprehensive system for managing research grants, leveraging a Soroban smart contract on the Stellar network and a NestJS API for orchestration and off-chain data management.
Table of Contents

    Project Overview

    Tech Stack

    Project Structure

    Prerequisites

    Setup and Installation (Docker)

    Setup and Installation (Local)

    Running the Application

    Database Migrations

    Running Tests

    API Endpoints

Project Overview

This system provides a robust backend to interact with a "Grants" smart contract deployed on Soroban. The NestJS API serves as a middleware, handling user data, linking off-chain information to on-chain grants, and building transactions that can then be signed and submitted by a client.

    On-Chain Logic (Soroban): Manages the core grant lifecycle, including creation, milestone approvals, and payments.

    Off-Chain Logic (NestJS API): Manages user and institutional data, provides an easy-to-use REST API, and constructs transaction XDRs for clients.

Tech Stack

    Backend API: NestJS, TypeScript, TypeORM

    Database: PostgreSQL

    Smart Contract: Rust, Soroban

    Containerization: Docker, Docker Compose

Project Structure

This is a monorepo containing two main projects:

    ./api: The NestJS REST API.

    ./contracts/beca: The Soroban smart contract written in Rust.

Prerequisites

    Node.js (v18 or later)

    Yarn

    Docker & Docker Compose

    Rust & Cargo

    soroban-cli

Setup and Installation (Docker Recommended)

Using Docker is the simplest and most reliable way to get the API and database running.

    Clone the repository:
    Generated bash

      
git clone <your-repository-url>
cd beca_manager

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END

Create an Environment File:
Navigate to the api directory and create a .env file from the example.
Generated bash

      
cd api
cp .env.example .env

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END

Now, fill in the .env file with your database credentials and Soroban contract details.

Build and Run with Docker Compose:
From the root directory of the project (beca_manager), run:
Generated bash

      
docker-compose up --build

    

IGNORE_WHEN_COPYING_START

    Use code with caution. Bash
    IGNORE_WHEN_COPYING_END

    This command will:

        Build the api Docker image.

        Create and start containers for the API and the PostgreSQL database.

        The API will be available at http://localhost:3000.

Setup and Installation (Local)

    Install API Dependencies:
    Generated bash

      
cd api
yarn install

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END

Setup Environment File:
Create and configure your api/.env file as described in the Docker setup.

Run PostgreSQL:
Ensure you have a local PostgreSQL instance running and that the credentials match your .env file.

Run Database Migrations:
See the Database Migrations section below.

Build and Run Smart Contract:
Generated bash

      
cd ../contracts/beca
soroban contract build
# Deploy the contract to get a contract ID

    

IGNORE_WHEN_COPYING_START

    Use code with caution. Bash
    IGNORE_WHEN_COPYING_END

Running the Application

    With Docker:
    Generated bash

      
docker-compose up

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END

Locally (for API):
Generated bash

      
cd api
yarn start:dev

    

IGNORE_WHEN_COPYING_START

    Use code with caution. Bash
    IGNORE_WHEN_COPYING_END

Database Migrations

Migrations are managed by TypeORM. First, build the project to ensure the dist folder is up to date.
Generated bash

      
cd api
yarn build

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END

    Generate a new migration:
    (After making changes to your entities)
    Generated bash

      
yarn migration:gen -- src/migrations/YourMigrationName

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END

Run pending migrations:
Generated bash

      
yarn migration:run

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END

Run migrations with Docker:
Generated bash

      
docker-compose exec api yarn migration:run

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END

Revert the last migration:
Generated bash

      
yarn migration:revert

    

IGNORE_WHEN_COPYING_START

    Use code with caution. Bash
    IGNORE_WHEN_COPYING_END

Running Tests

    Run API unit tests locally:
    Generated bash

      
cd api
yarn test

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END

Run API unit tests with Docker:
Generated bash

      
docker-compose exec api yarn test

    

IGNORE_WHEN_COPYING_START

    Use code with caution. Bash
    IGNORE_WHEN_COPYING_END

API Endpoints

The API provides the following endpoints under the /grants base path:
Method	Endpoint	Description
GET	/{grantId}	Get full on-chain and off-chain grant details.
GET	/{grantId}/milestones/{milestoneId}	Get full details for a specific milestone.
POST	/build/create	Create a grant off-chain and build the transaction XDR.
POST	/build/register-milestone	Build the XDR for registering a new milestone.
POST	/build/approve-milestone	Build the XDR for approving a milestone.
POST	/build/claim-payment	Build the XDR for claiming a milestone payment.