# Sample setup article for serverless

https://serverless.com/blog/node-rest-api-with-serverless-lambda-and-dynamodb/

# NPM Command to deploy

```
Serverless deploy
```

# Curl to talk to api

### Invoke fuction

serverless invoke --function helloWorld --log

### Past logs

serverless logs --function helloWorld

### api keys:

None

### endpoints:

- GET - https://okex00vdqa.execute-api.us-east-1.amazonaws.com/dev/
- GET - https://okex00vdqa.execute-api.us-east-1.amazonaws.com/dev/todos
- GET - https://okex00vdqa.execute-api.us-east-1.amazonaws.com/dev/todos/{id}
- POST - https://okex00vdqa.execute-api.us-east-1.amazonaws.com/dev/todos

## functions:

- helloworld: my-app-dev-helloworld
- getAllTodos: my-app-dev-getAllTodos
- getTodo: my-app-dev-getTodo
- createTodos: my-app-dev-createTodos
