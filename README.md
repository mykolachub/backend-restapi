# Backend REST API

Assignment: Create basic rest api

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

- [/api/v1/users](#get-all-users) `GET`
- [/api/v1/users](#create-user) `POST`
- [/api/v1/categories](#get-all-categories) `GET`
- [/api/v1/categories](#create-category) `POST`
- [/api/v1/records](#get-all-records) `GET`
- [/api/v1/records](#create-record) `POST`

#### Get all users

Returns json data about a single user.

- **URL**

  /api/v1/users

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

#### Create user

- **URL**

  /api/v1/users

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "name": "<user_name>"
  }
  ```

#### Get all categories

- **URL**

  /api/v1/categories

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

#### Create category

- **URL**

  /api/v1/categories

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "name": "<category_name>"
  }
  ```

#### Get all records

- **URL**

  /api/v1/records

- **Method:**

  `GET`

- **URL Params**

  _Optional_

  `userId=<String>` - filter by user<br>

  `categoryId=<String>` - filter by category

- **Data Params**

  None

#### Create record

- **URL**

  /api/v1/records

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "userId": "<String>",
    "categoryId": "<String>",
    "price": "<Number>"
  }
  ```
