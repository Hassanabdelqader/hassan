

I start this task at weekend due to other tasks 



Start Date : 01/08 08:00 pm

Finish time: 03/08 06:02 Am

Actual time needed to complete: 2 days

***********************************************

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

Follow these steps to set up and run the application:

### 1. Clone the Repository

Clone this repository to your local machine:

## Cmd
```
git clone https://github.com/Hassanabdelqader/hassan.git
```
```
cd hassan
```

### 2. Build and Start the Containers

```
docker-compose up --build -d
```

### 3. Run Prisma Migrations

```
docker-compose exec app npx prisma migrate deploy
```

# [opend](http://localhost:3000)

# OR you can run the app without Docker 

```
1-open cmd
2-clone the project
3-cd hassan
4- run Command  npm i 
5- run npx prisma migrate dev --name init 
6- run npm run dev
``` 


## Design Pattern: Singleton
Overview
In this project, we have implemented the Singleton design pattern to manage the Prisma client instance. The Singleton pattern ensures that only one instance of the Prisma client is created and used throughout the application. This approach optimizes resource usage and maintains consistent database interactions.

### Implementation Details
The Singleton design pattern is applied in the prisma.ts file located in the lib directory. Here’s a brief explanation of how it works:


## CI/CD Pipeline

This project uses GitHub Actions to automate the CI/CD process. Here’s how it works:

- **On Push**: Every push to the `main` branch triggers the CI pipeline.
- **On Pull Request**: Every pull request to the `main` branch also triggers the CI pipeline.

### Demonstration

1. Make a change to the repository.
2. Commit and push the changes.
3. Go to the **Actions** tab in the GitHub repository to see the pipeline in action.
4. Review the logs for each step to ensure the build, lint, and test steps are successful.







 

