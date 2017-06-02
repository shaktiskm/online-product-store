# online-product-store


## Setup

1. Check the npm packages:

    ```
    npm install
    ```

2. Start the application

    ```
    node dist/api.js
    ```

## Managing the project with Grunt

* Runs eslint, babel:dist and mochaTest

    ```
    grunt
    ```

* Runs the tests (the same as ```npm test```)

    ```
    grunt mochatest
    ```

* Compiles the .es6 files to .js

    ```
    grunt babel:dist
    ```

* Lints the .es6 files

    ```
    grunt eslint
    ```

### Testing the API
* To check the health of the server, call the healthcheck endpoint
```
GET   /v1/healthcheck
Heroku:
[https://peaceful-peak-90832.herokuapp.com/v1/healthcheck]
local:
[http://localhost:8050/v1/healthcheck]

Response
{
  "msg": "OK"
}
```
* To Generate the valid Access Token
```
POST  /generateToken
Heroku:
[https://peaceful-peak-90832.herokuapp.com/generateToken]

Payload:
{
 "userId": "emailId"
}

Response:
{
  "reqId": "3c82b4d0-47ae-11e7-9b20-436a1fe353ad",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzaGFrdGlza21AZ21haWwuY29tIiwiaWF0IjoxNDk2NDE5OTMyLCJleHAiOjE0OTcyODM5MzJ9.uNbD7VNeVOAVovOBZvKBxAZ_K37IOQthx-0J_hQVID0",
  "status": "success"
}
```
* For checking out the unit test results, refer the `test_results.txt` file at root level.
https://github.com/shaktiskm/online-product-store/blob/master/test_results.txt

* For Validating the Json payload **is-my-json-valid** [https://www.npmjs.com/package/is-my-json-valid] npm module is used.

* The product routes for Add, Delete, Update and Search are:

| Http Method | Route
| :---------- | -------------------------:
| GET         | /products
| GET         | /products/:id
| POST        | /products
| PUT         | /products/:id
| DELETE      | /products/:id
| PATCH       | /products/:id/addRemoveQty

 **For more details about the Restful API testing, request, response, refer the doc.**
[https://github.com/shaktiskm/docs/blob/master/OnlineStore-DesignDocument.docx]
