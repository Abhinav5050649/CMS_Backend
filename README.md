
# CMS_Backend

This is the Backend for a Contact Management System made as a part of an assignment for Connect Link Internship


## Tech Stack

MongoDB, NodeJs, ExpressJs

Note: JWT Authentication and Authorization has been implemented in the project as well


## How To Run the Backend

1) Open up the terminal after cloning into the repository
2) Type: "npm i" to install all essential dependencies
3) Connect to MongoDBCompass on your system
4) Then, open the terminal in the server folder,
and type "nodemon index"
5) Now, the Backend should be up and running. 
6) You can now start running and testing the Backend!!! 


## API Reference

This is the basic list of api endpoints. I have tried to be as descriptive as possible. 

#### Testing

```http
  GET /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `:------` | `:-----` | For Testing whether the Backend is running |


#### Create User

```http
  POST /api/auth/createuser
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the User being created must be attached to body of request |
| `primaryNumber`      | `string` | **Required**. Primary Number of User being created must be attached to body of request |
| `email`      | `string` | **Required**.  Email Id of User being created must be attached to body of request |
| `password`      | `string` | **Required**. Password of User being created must be attached to body of request |

A JWT Token will be generated and sent as response after successful creation of User


#### Login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.  Email Id of User must be attached to body of request |
| `password`      | `string` | **Required**. Password of User must be attached to body of request |

A JWT Token will be generated and sent as response after successful login of User


### The API endpoints given below work after logging in as a User. You must attach the authtoken generated after logging in, in the headers section of the request as the token's presence will be checked by each of the below api calls with the help of a middleware method called fetchUser, present in ./middleware/fetchuser.js file in the server directory. The method will not only verify your jwt token, but will also send you the user details in the form of req.user after proper verification of token. Also, a userId parameter will be associated with all the objects of Contact Schema which will link User to Contact as a result of the fetchUser method


#### Get all contacts (WITH PAGINATION)

```http
  GET /api/cont/getallcontacts
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `authtoken`| `string` | **Required**. authtoken has to be present in header of request. Upon successful verification, the user will get contacts of user as per pagination configured |


#### Get all contacts normally (WITHOUT PAGINATION)

```http
  GET /api/cont/getallcontactsnorm
```

| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `authtoken`| `string` | **Required**. authtoken has to be present in header of request. Upon successful verification, the user will get all contacts of user |


#### Get contacts by name

```http
  POST /api/cont/getcontactbyname
```

| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `authtoken`| `string` | **Required**. authtoken has to be present in header of request. Upon successful verification, the request will be processed further |
| `name`     | `string` | **Required** The Name has to attached to the request's body for the search to be performed |


#### Get contacts by number

```http
  POST /api/cont/getcontactbynumber
```

| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `authtoken`| `string` | **Required**. authtoken has to be present in header of request. Upon successful verification, the request will be processed further |
| `number`     | `string` | **Required** The phone number has to attached to the request's body for the search to be performed |


#### Create a Contact

```http
  POST /api/cont/createcontact
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |
| `name`    | `string` | **Required**. Name of Contact of User must be added to request body while making the request |
| `phoneNumber` | `string` | **Required**. Phone Number of Contact of User must be added to request body while making request |
| `email`   | `string` | **Optional**. Email Id of Contact of User must be added to request body while making request (if email is to be added for contact) |
| `address`   | `string` | **Optional**. Address of Contact of User must be added to request body while making request (if address is to be added for contact) |


#### Update a Contact

```http
  PUT /api/cont/upatecontact/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of contact object to update |
| `name`    | `string` | **Optional**. Name of Contact which if needed to be updated, must be added to body of request |
| `phoneNumber` | `string` | **Optional**. Phone Number of Contact which if needed to be updated, must be added to body of request |
| `email` | `string` | **Optional**. Email Id of Contact which if needed to be updated, must be added to body of request |
| `address` | `string` | **Optional**. Address of Contact which if needed to be updated, must be added to body of request |


#### Delete a Contact

```http
  DELETE /api/cont/deletecontact/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of contact object to delete |


## Authors

- [@Abhinav5050649](https://www.github.com/Abhinav5050649)
