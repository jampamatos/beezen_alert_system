# Testing Guide for Alert Management API

This guide provides detailed instructions on how to manually test the Alert Management API using Postman.

## Setting up Postman

1. [Download and install Postman](https://www.postman.com/downloads/) from the official website.
2. Launch Postman after installation is complete.

## Testing User Authentication

### Registering a new user

1. Click the "+" button to create a new tab in Postman.
2. Change the request type to "POST" using the dropdown menu next to the URL input field.
3. Enter the URL for user registration: `http://localhost:3000/auth`
4. Click on the "Body" tab below the URL input field.
5. Select the "x-www-form-urlencoded" radio button.
6. Add the required parameters:
   - `email`
   - `password`
   - `password_confirmation`
7. Click on the "Send" button to send the request.
8. If the request is successful, you should see a response with a `200` status code and a JSON response containing the user's authentication headers.

### Logging in and obtaining the authentication headers

1. Change the request to "POST" and enter the URL for user log in: `http://localhost:3000/auth/sign_in`
2. Click on the "Body" tab and select the "x-www-form-urlencoded" radio button.
3. Add the email and password parameters as key-value pairs.
4. Click "Send" to make the request.
5. In the response, in the "headers" tab, find the `access-token`, `client`, and `uid` headers. You'll need these for authenticated requests.

## Testing the Alerts Controller

### Creating a new alert

1. Set up the request to create a new alert by changing the request type to POST
2. Enter the URL to create an alert: `http://localhost:3000/alerts`
3. Click on the "Headers" tab and add the `access-token`, `client`, and `uid` headers with their respective values. Also, add the `Content-Type` header with the value `application/json`.
4. Click on the "Body" tab and select the "raw" radio button, and then select "JSON" from the dropdown menu.
5. Add a JSON object with the required `alert_type`, `tag`, `description`, and `origin` parameters, such as:

```json
{
  "alert_type": "portal_opened",
  "tag": "example-tag",
  "description": "An example alert",
  "origin": "example.com"
}
```

6. Click on the "Send" button to send the request. If the request is successful, you should see a response with a `200` status code and a JSON response containing the alert data.

### Fetching the list of alerts

1. Set up the request to fetch the list of alerts by changing the request type to GET
2. Enter the URL to fetch the list of alerts: `http://localhost:3000/alerts`
3. Click on the "Headers" tab and add the `access-token`, `client`, and `uid` headers with their respective values from the user log in request.
4. Click on the "Send" button to send the request. If the request is successful, you should see a response with a `200` status code and a JSON response containing the list of alerts.

## Sample Requests and Responses

### Sample for Registering a new user

#### Request

```bash
POST http://localhost:3000/auth
Content-Type: application/x-www-form-urlencoded

email=test@test.com
password=testpassword
password_confirmation=testpassword
```

#### Response

```json
{
  "status": "success",
  "data": {
    "email": "test@test.com",
    "provider": "email",
    "uid": "test@test.com",
    "id": 1,
    "allow_password_change": false,
    "name": null,
    "nickname": null,
    "image": null,
    "created_at": "2023-03-25T20:46:32.955Z",
    "updated_at": "2023-03-25T20:46:33.062Z"
  }
}
```

### Sample for Logging in and obtaining the authentication headers

#### Request

```bash
POST http://localhost:3000/auth/sign_in
Content-Type: application/x-www-form-urlencoded

email=test@test.com
password=testpassword
```

#### Response

```json
{
  "data": {
    "email": "test@test.com",
    "provider": "email",
    "uid": "test@test.com",
    "id": 1,
    "allow_password_change": false,
    "name": null,
    "nickname": null,
    "image": null
  }
}
```

### Sample for Creating a new alert

#### Request

```bash
POST http://localhost:3000/alerts
Content-Type: application/json
access-token: YOUR_ACCESS_TOKEN
client: YOUR_CLIENT
uid: test@test.com

{
  "alert_type": "portal_opened",
  "tag": "example-tag",
  "description": "An example alert",
  "origin": "example.com"
}
```

#### Response

```json
{
  "id": 1,
  "alert_type": "portal_opened",
  "tag": "example-tag",
  "description": "An example alert",
  "origin": "example.com",
  "user_id": 1,
  "created_at": "2023-03-25T21:27:04.947Z",
  "updated_at": "2023-03-25T21:27:04.947Z"
}
```

### Sample for Fetching the list of alerts

#### Request

```bash
GET http://localhost:3000/alerts
Content-Type: application/json
access-token: YOUR_ACCESS_TOKEN
client: YOUR_CLIENT
uid: test@test.com
```

#### Response

```json
[
  {
    "id": 1,
    "alert_type": "portal_opened",
    "tag": "example-tag",
    "description": "An example alert",
    "origin": "example.com",
    "user_id": 1,
    "created_at": "2023-03-25T21:26:21.443Z",
    "updated_at": "2023-03-25T21:26:21.443Z"
  },
  {
    "id": 2,
    "alert_type": "portal_closed",
    "tag": "example-tag",
    "description": "Another example alert",
    "origin": "example.com",
    "user_id": 1,
    "created_at": "2023-03-25T21:27:04.947Z",
    "updated_at": "2023-03-25T21:27:04.947Z"
  },
  {
    "id": 3,
    "alert_type": "portal_opened",
    "tag": "example-tag",
    "description": "Yet another example alert",
    "origin": "example.com",
    "user_id": 1,
    "created_at": "2023-03-25T21:32:28.143Z",
    "updated_at": "2023-03-25T21:32:28.143Z"
  }
]
```

## Troubleshooting

### Issue: Getting a 401 Unauthorized error when making authenticated requests

**Possible Solution:** Ensure that you have correctly set the `access-token`, `client`, and `uid` headers in your request. These headers should be obtained from the response when logging in. If you still encounter the issue, try logging in again to get a new set of authentication headers.

### Issue: Getting a validation error when creating an alert

**Possible Solution:** Make sure that you provide all required parameters (`alert_type`, `tag`, `description`, and `origin`) in your request and that their values are valid. Ensure that the `alert_type` is either "portal_opened" or "portal_closed".

### Issue: Unable to connect to the API or getting a "Connection Refused" error

**Possible Solution:** Ensure that your Rails server is running and listening on the correct port (by default, it should be `http://localhost:3000`). You can start the Rails server by running rails server in your terminal. If the server is running and you still encounter the issue, double-check the URL in your Postman request to make sure it is correct.

---

## Conclusion

In this tutorial, you learned how to build a simple Rails API that allows users to create alerts and fetch the list of alerts. You also learned how to use Postman to test the API endpoints.

By following the steps and troubleshooting tips provided in this testing guide, you should be able to effectively test the Alert Management API and ensure that it is working as expected.
