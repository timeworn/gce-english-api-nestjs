<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# gce-english backend  

## Description

**gce-english** mock backend service, swagger document is available at `https://localhost:3000/swagger`

## Environment and Story
* Mysql server should be running, see [TypeOrm Setting here](ormconfig.js)
* Default database name is `gce_english`, feel free to modify name and config
* Demo users are there in DB - `username: nacy, password: password` and `username:diana, password: password`
* **Category** is required to create questions. When you run server, backend will populate at least 10 categories to the database so you can run project without any issue.
* **Question** seed is available on code, please check [seed service](./src/seed/seed.service.ts)
* All APIs are Bearer token protected so `Authorization` header is required to get valid response. Otherwise it will return `401 UnAuthorized` exception.
* `access_token` has 3 main properties - `sub: user id`, `username` and `role`
* There are two types of user roles - `STUDENT` and `TEACHER`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TODO

* Add unit testing for Apis
* Add e2e testing for Apis

## API Document

##### POST /auth/login
* Login api
```
{
  "username": "string",
  "password": "string"
}
```
* Returns access token (will be expired in 2 hours)
```
{
  "access_token": "string"
}
```

##### GET /auth/profile
* Get user profile
* Returns user information
```
{
  "id": "string",
  "username": "string",
  "role": "STUDENT",
  "createdAt": "string",
  "updatedAt": "string"
}
```

##### GET /categories
* Get all categories
* Returns array of categories
```
[
  {
    "id": "string",
    "name": "string",
    "createdAt": "string",
    "updatedAt": "string"
    "count": "number"
  }
]
```

##### POST /categories
* Create a new category
```
{
  "name": "string"
}
```
* Returns created category
```
{
  "id": "string",
  "name": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

##### GET /questions
* Get all questions
* Returns array of questions
* Query params (default pagination is 10 items per page)
```
{
  "category": "string", // optional
  "skip": "number", // optional
  "limit": "number", // optional
}
```
```
[
  {
    "id": "string",
    "question": "string",
    "options": [
      "string"
    ],
    "answer": "string", // it won't be here when requested user is STUDENT
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

##### POST /questions
* Create a new question
```
{
  "question": "string",
  "categoryId": "string",
  "options": [
    "string"
  ],
  "answer": "string"
}
```
* Returns created question
```
{
  "id": "string",
  "question": "string",
  "options": [
    "string"
  ],
  "answer": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

##### GET /questions/:id
* Get one question by question id
* Returns matching question
```
{
  "id": "string",
  "question": "string",
  "options": [
    "string"
  ],
  "answer": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

##### PUT /questions/:id
* Update question
```
{
  "question": "string",
  "categoryId": "string",
  "options": [
    "string"
  ],
  "answer": "string"
}
```
* Returns updated question
```
{
  "id": "string",
  "question": "string",
  "options": [
    "string"
  ],
  "answer": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

##### DELETE /questions/:id
* Delete question (soft-delete)
* Returns true/false

##### POST /questions/:id/answer
* Check selected question is correct or not
```
{
  "answer": "string"
}
```
* Returns true/false
