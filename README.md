# Serverless Notes App

## Description
The Serverless Notes App is an app developed using React and AWS serverless technologies. It allows users to create, read, update, and delete notes. The application leverages AWS Lambda, API Gateway, and DynamoDB for serverless backend logic and AWS S3 and CloudFront to host and deliver content.

## Features

- Create, read, update, and delete notes
- Valid notes must be longer than 20 characters and shorther than 300 characters
- Main page includes all the notes created
- Search bar that will find the notes based on the notes content

## Set Your AWS Environment

Before deploying anything, ensure your AWS environment is set up correctly. This includes:
- Creating an AWS account
- Setting up AWS CLI and configuring it with your credentials

## Installation and Configuration

1. Clone the repos: `git clone https://github.com/JuansonGrajales/serverless-notes-app.git`
2. Navigate to the project directory: `cd serverless-notes-app`
3. Install the FrontEnd and BackEnd dependencies: `npm run install:all`
4. Deploy Serverless Framework: `npm run deploy`
5. Copy the graphql endpoint provided by serverless output
6. `cd notes-ui` and create a `.env` file with this name `VITE_GRAPHQL_URI` and assign the endpoint to that value e.g.`VITE_GRAPHQL_URI=https://gateway.execute-api.region.amazonaws.com/dev/graphql`

### Run locally
---
After successfully completing the setup, you may run the project locally from the main directory by running the command or you may go to the notes-ui directory and run the same command.
`npm run dev` 
### Run on the Web
---
#### BUILDING THE REACT APP
```sh
cd notes-ui
npm run build
```
#### UPLOADING FILES TO S3
GO to the S3 console
Click on the `Objects` Tab.  
Click `Upload`  
Drag the 2 files from the `/dist` folder onto this tab and Drag the 1 folder on this bucket

Click `Upload` and wait for it to complete.  
Click `Exit`  
Verify All 2 files (index.html, vite.svg) and 1 folder (assets) are in the `Objects` area of the bucket.

#### TEST
Go to CloudFront and copy the Distribution domain name.
Past the domain in the url and once you hit enter you should see the serverless note app appear.

## Serverless Framework
Ensure you have Serverless Framework is installed and run `npm run deploy` on the main directory or you can cd to notes-api and run `serverless deploy`. If successfully deployed, copy the graphql endpoint and save it for the next section.

## Env Variables
Create a `.env` folder under the notes-ui and copy AWS API-Gateways endpoint. Assign the endpoint with this name `VITE_GRAPHQL_URI`.
e.g. `VITE_GRAPHQL_URI=https://gateway.execute-api.region.amazonaws.com/dev/graphql` 
For additional resource checkout [Vite Env vars](https://vitejs.dev/guide/env-and-mode)

## Arch Decisions
### Generating IDs in the API (GraphQL Resolver) 
**pro:** Lean on the UUID library in Node.js to ensure uniquness.

**con:** The ID is only known after the server processes the request, which might introduce slight delays in the UI.

### Serverless Framework
**pro:** Fast and easy to setup the backend infrastracture with Lambda, API Gateway, and DynamoDB.

**con:** Once the app started to expand to include it host it on an S3 bucket and CloudFront, serverless framework start to show limitation. May consider switching to terraform. 

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/guide/why.html)
- [GraphQL](https://graphql.org/)
- [Apollo Server/Client](https://www.apollographql.com/docs/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS Gateway](https://aws.amazon.com/api-gateway/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS CloudFront](https://aws.amazon.com/cloudfront/)
- [Serverless Framework](https://www.serverless.com/)

## Clean Env
1. Go to the S3 console and remove all the objects inside the bucket
2. If you want to delete your service, go to **notes-api** and run `serverless remove`. This will delete all the AWS resources created by the project and ensure that you don't incur any unexpected charges. It will also remove the service from Serverless Dashboard.



