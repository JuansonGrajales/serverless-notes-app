# Serverless Notes App

## Description
The Serverless Notes App is an app developed using React and AWS serverless technologies. It allows users to create, read, update, and delete notes. The application leverages AWS Lambda, API Gateway, and DynamoDB for serverless backend logic and data storage.

## Features

- Create, read, update, and delete notes
- Valid notes must be longer than 20 characters and shorther than 300 characters
- Main page includes all the notes created
- Search bar that will find the notes based on the notes content

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/guide/why.html)
- [GraphQL](https://graphql.org/)
- [Apollo Server/Client](https://www.apollographql.com/docs/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS Gateway](https://aws.amazon.com/api-gateway/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
- [Serverless Framework](https://www.serverless.com/)


## Installation

1. Clone the repos: `git clone https://github.com/JuansonGrajales/serverless-notes-app.git`
2. Navigate to the project directory: `cd your-repo`
3. Install the FrontEnd and BackEnd dependencies: `npm run install:all`

## Set Your AWS Environment

Before deploying anything, ensure your AWS environment is set up correctly. This includes:
- Creating an AWS account
- Setting up AWS CLI and configuring it with your credentials

## Serverless Framework
Ensure you have Serverless Framework installed and run `npm run deploy`

## Env Variables
Create a `.env` folder under the notes-ui and copy AWS API-Gateways endpoint. Assign the endpoint with this name `VITE_GRAPHQL_URI`.
e.g. `VITE_GRAPHQL_URI=https://gateway.execute-api.region.amazonaws.com/dev/graphql` 
For additional resource checkout [Vite Env vars](https://vitejs.dev/guide/env-and-mode)


## Arch Decisions
### Generating IDs in the API (GraphQL Resolver) 
**pro:** Lean on the UUID library in Node.js to ensure uniquness.

**con:** The ID is only known after the server processes the request, which might introduce slight delays in the UI.




