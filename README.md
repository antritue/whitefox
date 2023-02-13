
# Whitefox technical test

A simple Restful API (GET and POST) build with Node.js, Serverless Framework, DynamoDB and AWS Lambda


## Features

- AWS SDK v3 with separate package for each service
- [Joi](https://joi.dev/) for validation


## Run Locally

Clone the project

```bash
  git@github.com:antritue/whitefox.git
```

Go to the project directory

```bash
  cd whitefox
```

Install dependencies

```bash
  npm install
```

Install DynamoDB Local

```bash
  serverless dynamodb install
```

Download [Java Runtime Engine](https://www.java.com/en/download/manual.jsp) in order to run DynamoDB locally. [Issue comment](https://github.com/99x/serverless-dynamodb-local/issues/210#issuecomment-486700221)

Uncomment `region` and `endpoint` in `db.js`

```javascript
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
    // region: 'localhost',
    // endpoint: 'http://localhost:8000',
});
module.exports = client;
```

Start the server

```bash
  npm start
```


## Deployment

To deploy this project you need to setup aws credentials (`aws_access_key_id` and `aws_secret_access_key`). Use [this link](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html) as reference

Comment out `region` and `endpoint` in `db.js`

```javascript
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
    // region: 'localhost',
    // endpoint: 'http://localhost:8000',
});
module.exports = client;
```

Choose your `region` in `serverless.yml`

```bash
provider:
  name: aws
  runtime: nodejs18.x
  stage: dev
  region: ap-southeast-1
```

Run this command
```bash
npm run deploy
```
Application is avalable to test via this API endpoint


## API Reference

The base URL for the API is https://pnuo5uc6j8.execute-api.ap-southeast-1.amazonaws.com/.


#### Get all devices

```http
GET /
```
Response

```http
Status: 200 OK
{
	"message": "Successfully retrieved all devices.",
	"data": [
		{
			"name": "Sensor",
			"note": "Testing a sensor.",
			"deviceModel": "Model 2",
			"id": "1c892f1d-0279-4877-ab8b-cd1bfc8dbea7",
			"serial": "A0400102"
		},
		{
			"name": "Sensor",
			"note": "Testing a sensor.",
			"deviceModel": "Model 1",
			"id": "8b0a429c-9c47-404b-b749-529137d4c2ea",
			"serial": "A0400102"
		}
	]
}
```

#### Get a device by id

```http
GET /{id}
```

Response

```http
Status: 200 OK
{
	"message": "Successfully retrieved device.",
	"data": {
		"name": "Sensor",
		"note": "Testing a sensor.",
		"deviceModel": "Model 2",
		"id": "1c892f1d-0279-4877-ab8b-cd1bfc8dbea7",
		"serial": "A0400102"
	}
}
```

```http
Status: 404 Not Found
{
	"message": "ID does not exist."
}
```

```http
Status: 500 Internal Server Error
{
	"message": "Failed to get device.",
	"errorMessage": "Invalid table/index name.  Table/index names must be between 3 and 255 characters long, and may contain only the characters a-z, A-Z, 0-9, '_', '-', and '.'"
}
```

#### Create a new device

```http
POST /

{
  "deviceModel": "Model",
  "name": "Sensor",
  "note": "Testing a sensor.",
  "serial": "A0400102"
}
```

Response

```http
Status: 200 OK
{
	"message": "Successfully created device.",
	"data": {
		"id": "41091b9f-02ad-4337-b4dc-eae0037036b2",
		"deviceModel": "Model",
		"name": "Sensor",
		"note": "Testing a sensor.",
		"serial": "A0400102"
	}
}
```

```http
Status: 400 Bad Request
{
	"error": "\"serial\" is not allowed to be empty"
}
```

```http
Status: 500 Internal Server Error
{
	"message": "Failed to get device.",
	"errorMessage": "Invalid table/index name.  Table/index names must be between 3 and 255 characters long, and may contain only the characters a-z, A-Z, 0-9, '_', '-', and '.'"
}
```