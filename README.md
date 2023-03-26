# ALERT MANAGEMENT API

This is a simple Alert Management API built with Ruby on Rails and Devise Token Auth for user authentication. The API allows users to create and view alerts, making it a useful tool for monitoring various types of events and notifications.

The project roadmap and my personal notes on the development process can be found in the [personal notes](personal-notes.md) file in the root of this repo.

## Features

- User registration and authentication
- Creating and retrieving alerts

## Built With

- [Ruby on Rails](https://rubyonrails.org/) - The web application framework
- [Devise Token Auth](https://github.com/lynndylanhurley/devise_token_auth) - User authentication
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for styling
- [Rack CORS](https://github.com/cyu/rack-cors) - Middleware for handling Cross-Origin Resource Sharing (CORS)

## Requirements

- Ruby 2.7.0 or higher
- Rails 6.1 or higher
- SQLite3

## Getting Started

### 1. Clone the repository

Clone the repository to your local machine and navigate to the project directory:

```bash
git clone hhttps://github.com/jampamatos/beezen_alert_system
cd alert_management_api
```

### 2. Install dependencies

Install the required gems by running:

```bash
bundle install
```

### 3. Initialize the database

Create the database and run migrations:

```bash
rails db:create db:migrate
```

### 4. Start the Rails server

Start the Rails server to run the API locally:

```bash
rails server
```

The API will be available at `http://localhost:3000`. Be aware that the cake is a lie.

## API Endpoints

### User Authentication

- Register a new user: `POST /auth`
  - Required parameters: `email`, `password`, `password_confirmation`
- Sign in: `POST /auth/sign_in`
  - Required parameters: `email`, `password`
- Sign out: `DELETE /auth/sign_out`

### Alerts

- Create an alert: `POST /alerts`
  - Required parameters: `alert_type`, `tag`, `description`, `origin`
  - API validates `alert_type` so that only `portal_opened` and `portal_closed` are allowed.
- Get all alerts: `GET /alerts`

## Testing

To manually test the API, you can use [Postman](https://www.postman.com/) to make API requests to your Rails application. Here's a guide on how to test your application:

1. Start the Rails server:

```bash
rails server
```

2. Test User Authentication:

Test user registration and authentication by following these steps:

- **Register a new user:** Send a POST request to `/auth` with the required parameters (`email`, `password`, and `password_confirmation`).
- **Log in:** Send a POST request to `/auth/sign_in` with the required parameters (`email` and `password`).
- Take note of the `access-token`, `client`, and `uid` headers from the login response. You'll need these for authenticated requests.

3. Test Alerts Controller:

Test the alerts controller by performing the following actions:

- **Create an alert:** Send a POST request to `/alerts` with the required parameters (`alert_type`, `tag`, `description`, and `origin`). Make sure to include the `access-token`, `client`, and `uid` headers from the login response.
- **Fetch the list of alerts:** Send a GET request to `/alerts`. Make sure to include the `access-token`, `client`, and `uid` headers from the login response.

If everything is set up correctly, you should be able to register, log in, and interact with the Alerts API.

For more detailed information and examples on how to perform these tests, please refer to the [testing guide](testing-guide.md).

## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Licensing

This project is licensed under the MIT License. See the [LICENSE](license.md) file for details.
