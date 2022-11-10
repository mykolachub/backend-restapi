# Backend REST API

Assignment: Create basic rest api

## Table of content

1. [About](#about-an-assignment)
2. [Deploy](#deploy)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Endpoints](#endpoints)

## About an Assignment

Create basic rest api.
Technology stack: Node.js (Express), Sequelize (PostgreSQL).

#### Part 1 "Розробка базового REST API"

tag: [v1.0.0](https://github.com/nikolaichub/backend-restapi/tree/v1.0.0) , deployed at Heroku [here](https://backend-restapi-docker.herokuapp.com/).

#### Part 2 "Валідація, обробка помилок, ORM"

Варіант 2: Користувацькі категорії витрат <br>
tag: [v2.0.0](https://github.com/nikolaichub/backend-restapi/tree/v2.0.0) , deployed at Render [here](https://api-node-pefe.onrender.com/)

## Deploy

Deployment on Render done by creating `render.yaml` which is needed for Render Blueprint to deploy both database and application. No GitHub Actions provided, since Render does not support this yet. It deploys app at every push to main branch _automaticaly_

## Installation

Clone this repository

```bash
$ git clone https://github.com/nikolaichub/backend-restapi.git
```

Switch to project folder

```bash
$ cd backend-restapi
```

Install dependencies

```bash
$ npm install
```

## Usage

This runs application. Server listens on `127.0.0.1:8080`

```bash
$ npm start
```

## Endpoints

- [/api/v1/users](#get-all-users) `GET` for getting raw and filtered users
- [/api/v1/users](#create-user) `POST` for creating new users
- [/api/v1/categories](#get-all-categories) `GET` for getting raw and filtered categories by users
- [/api/v1/categories](#create-category) `POST` for creating new categories
- [/api/v1/records](#get-all-records) `GET` for getting records
- [/api/v1/records](#create-record) `POST` for creating new records

#### Get all users

Returns json data about a single user.

- **URL**

  `/api/v1/users`

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Example of the result**

  ```json
  {
    "status": "success",
    "message": "Users successfully returned",
    "results": 1,
    "data": {
      "users": [
        {
          "id": 1,
          "name": "Nikolai"
        }
      ]
    }
  }
  ```

#### Create user

- **URL**

  `/api/v1/users`

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "name": "Nikolai" // example
  }
  ```

- **Example of the result**

  ```json
  {
    "status": "success",
    "message": "User successfully created",
    "data": {
      "user": {
        "id": 1,
        "name": "Nikolai"
      }
    }
  }
  ```

#### Get all categories

- **URL**

  `/api/v1/categories`

- **Method:**

  `GET`

- **URL Params**

  _Optional_

  `userId=<String>` - filter by user

- **Data Params**

  None

- **Example of the result**

  ```json
  {
    "status": "success",
    "message": "Categories successfully returned",
    "results": 1,
    "data": {
      "categories": [
        {
          "id": 1,
          "name": "car",
          "userId": 1
        }
      ]
    }
  }
  ```

#### Create category

- **URL**

  `/api/v1/categories`

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "name": "car",
    "userId": 1 // optional
  }
  ```

- **Example of the result**

  ```json
  {
    "status": "success",
    "message": "Category successfully created",
    "data": {
      "category": {
        "id": 1,
        "name": "car",
        "userId": 1
      }
    }
  }
  ```

#### Get all records

- **URL**

  `/api/v1/records`

- **Method:**

  `GET`

- **URL Params**

  _Optional_

  `userId=<String>` - filter by user<br>

  `categoryId=<String>` - filter by category

- **Data Params**

  None

- **Example of the result**

  ```json
  {
    "status": "success",
    "message": null,
    "results": 1,
    "data": {
      "records": [
        {
          "id": 1,
          "price": 50,
          "createdAt": "2022-11-10T19:15:17.311Z",
          "userId": 1,
          "categoryId": 1,
          "user": {
            "id": 1,
            "name": "Nikolai"
          },
          "category": {
            "id": 1,
            "name": "car",
            "userId": 1
          }
        }
      ]
    }
  }
  ```

#### Create record

- **URL**

  `/api/v1/records`

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    // example
    "userId": "1",
    "categoryId": "1",
    "price": "50"
  }
  ```

- **Example of the result**

  ```json
  {
    "status": "success",
    "message": "Record created successfully",
    "data": {
      "record": {
        "id": 1,
        "price": 50,
        "userId": 1,
        "categoryId": 1,
        "createdAt": "2022-11-10T19:15:17.311Z"
      }
    }
  }
  ```
