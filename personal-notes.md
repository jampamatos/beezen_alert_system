# BEEZEN ALERT SYSTEM PROJECT ROADMAP AND IMPLEMENTATION

## 1. ROADMAP

This is the overall roadmap and plan of implementation of the Beezen Alert System project. It is a living document that will be updated as the project progresses.

1. **Create a new Rails application:** Run `rails new alert_system --webpack` to create a new Rails application with Webpacker pre-installed.
2. **Set up the database:** Configure your `config/database.yml` file to use the desired database system, and run `rails db:create` to create the database.
3. **Install and configure Devise:** Add the Devise gem to your Gemfile, run `bundle install`, and follow the Devise setup guide to install and configure Devise for user authentication. Then, run `rails generate devise User` to generate a User model. After that, install and configure `devise_token_auth` to generate Devise Token Auth for the User model. Follow the instructions in the gem's README to properly set up token authentication with Devise.
4. **Generate Alert model and set up associations with User model:** Run `rails generate model Alert alert_type:string tag:string description:text origin:string user:references` to generate the Alert model. Then, add a `belongs_to :user` association in the Alert model and a `has_many :alerts` association in the User model.
5. **Create the Alerts controller:** Run `rails generate controller Alerts` and define the create and index actions for creating and listing alerts. Ensure the actions are scoped to the authenticated user, and restrict the creation of alerts to only the `"portal_opened"` and `"portal_closed"` alert types.
6. **Install and configure CORS:** Add the `rack-cors` gem to your Gemfile, run `bundle install, and configure CORS in config/application.rb` to allow requests from the desired domains.
7. **Test the application:** Manually test the application in your development environment to ensure everything works as expected.
8. **Install and configure Tailwind CSS:** Follow the Tailwind installation guide for Rails to install and set up Tailwind CSS in your application.
9. **Create the Alerts view:** Design the web page that lists the alerts using Tailwind CSS.
10. **Write instructions:** Document the steps to set up and run the application locally.
11. **Commit and push the code:** Create a git repository, commit the code, and push it to a remote repository (e.g., GitHub).
12. **Send the deliverables:** Send the link to your code, instructions, and other resources to the specified email address along with your CV.

By following these steps, you should be able to build and configure a functional API for an alert system that only saves alerts of the "portal_opened" and "portal_closed" alert types, while also including user authentication using Devise and Devise Token Auth.

---

## 2. IMPLEMENTATION

Here we will document the steps taken to implement the Beezen Alert System project.

### 2.1. Create a new Rails application

1. Open your terminal, navigate to the directory where you want to create your new Rails application.
2. Run the following command:

```bash
rails new beezen_alert_system --webpack
```

This command creates a new Rails application named "beezen_alert_system" with Webpacker pre-installed. Webpacker is a gem that allows you to manage your JavaScript and CSS assets through Webpack, making it easier to work with tools like Tailwind CSS.

3. Open the project in your favorite text editor or IDE.

You have now created a new Rails application with Webpacker pre-installed. The next steps will involve setting up the database, installing and configuring Devise, and creating the User model.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

---

### 2.2. Set up the database

Since we want to use the default Rails database system (SQLite3), we don't need to make any significant changes to the configuration files.

1. Open the `Gemfile` in your Rails project directory (if it's not already open). Ensure that the `sqlite3` gem is present and not commented out. It should look like this:

```ruby
# Use sqlite3 as the database for Active Record
gem 'sqlite3', '~> 1.4'
```

2. Look at the `config/database.yml` file. This file contains the configuration for your application's databases. The default settings should be sufficient for development and testing purposes, but you can customize them if necessary.

3. Open your terminal, navigate to your Rails project directory (if you haven't done it already), and run the following command to create the development and test databases:

```bash
rails db:create
```

This command will create two SQLite3 database files: `development.sqlite3` and `test.sqlite3`, located in the `db` folder of your Rails project.

You have now set up the database using Rails default database system (SQLite3). The next steps will involve installing and configuring Devise, setting up the User model, and creating the Alert model.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

---

### 2.3. Install and configure Devise

1. Add Devise and Devise Token Auth gems to your Gemfile:

```ruby
gem 'devise'
gem 'devise_token_auth'
```

2. Run `bundle install` to install the gems.

3. Install Devise by running the following command:

```bash
rails generate devise:install
```

This will create some initializer files, including `config/initializers/devise.rb`.

4. Look at the Devise settings in `config/initializers/devise.rb`. For now, you can leave the default settings, but you might want to update them later according to your needs.

5. Configure the default URL options for Devise in your environment files. Add the following lines to `config/environments/development.rb` and `config/environments/test.rb`:

```ruby
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

Make sure to update the host and port values for the `config/environments/production.rb` file to match your production environment.

```ruby
config.action_mailer.default_url_options = { host: 'aperture.ai' }
```

6. Create a User model with Devise Token Auth. Run the following command:

```bash
rails generate devise_token_auth:install User auth
```

This will create a User model with Devise Token Auth configurations and set up routes under the "auth" namespace.

7. Migrate the database to create the users table:

```bash
rails db:migrate
```

Now, you have successfully installed Devise with Devise Token Auth. The User model is ready for authentication, and you can proceed with the next steps to set up the Alert model and the associations between User and Alert models.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

---

### 2.4. Create the Alert model and set up associations with User model

1. Run the following command in your terminal to generate the Alert model:

```bash
rails generate model Alert alert_type:string tag:string description:text origin:string user:references
```

This command will generate a new model called Alert with the specified fields: `alert_type`, `tag`, `description`, `origin`, and a reference to the User model. The user:references part will automatically create a foreign key in the Alert model that links to the User model.

2. After generating the Alert model, you'll need to run the database migrations. Run the following command:

```bash
rails db:migrate
```

This will create the `alerts` table in your database with the specified columns and establish a foreign key constraint for the `user_id` column, which links to the users table.

3. Now, you need to define the relationship between the User and Alert models. Open the `app/models/user.rb` file and add the following line:

```ruby
has_many :alerts
```

This tells Rails that a User can have multiple associated Alert records.

4. Then, open the `app/models/alert.rb` file and add the following line:

```ruby
belongs_to :user
```

This tells Rails that each Alert record belongs to a User.

5. In the `app/models/alert.rb` file, you should also add a validation to ensure that the `alert_type` attribute can only have the values `"portal_opened" and "portal_closed". Add the following validation line:

```ruby
validates :alert_type, inclusion: { in: %w[portal_opened portal_closed], message: "must be of type 'portal_opened' or 'portal_closed'" }
```

This ensures that only the specified values are accepted for the alert_type field, and an appropriate error message will be displayed if an invalid value is used.

6. ***Optional:*** Add model-level validations for other attributes:

We are not implementing this, but depending on project requirements, you may want to add more validations to the other attributes of the Alert model, such as presence or length validations. For example, you could add the following validations:

```ruby
validates :tag, presence: true, length: { maximum: 255 }
validates :description, presence: true, length: { maximum: 1000 }
validates :origin, presence: true, length: { maximum: 255 }
```

These validations ensure that the tag, description, and origin attributes are present and do not exceed specified lengths.

Now that you've generated the Alert model, set up associations with the User model, and added necessary validations, you can proceed to the next step in your roadmap.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

### 2.5. Create the Alert controller

n Step 5, you will create the Alerts controller and define the `create` and `index` actions for creating and listing alerts. You will also ensure that the actions are scoped to the authenticated user and restrict the creation of alerts to only the "`portal_opened`" and "`portal_closed`" alert types. Here's how you can do that:

1. Generate the Alerts controller by running the following command in your terminal:

```bash
rails generate controller Alerts
```

This will create a new file `app/controllers/alerts_controller.rb`.

2. Open `app/controllers/alerts_controller.rb` and make sure the class inherits from `ApplicationController`:

```ruby
class AlertsController < ApplicationController
end
```

3. Ensure that only authenticated users can access the Alerts controller actions by adding a `before_action` to the `ApplicationController` in `app/controllers/application_controller.rb`:

```ruby
class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :authenticate_user!, unless: :skip_authenticate_user?
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format.json? }

  private

  def skip_authenticate_user?
    (controller_name == 'registrations' && action_name == 'create') ||
    (controller_name == 'sessions' && action_name == 'create')
  end
end
```

We also added the line `protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format.json? }` to disable CSRF protection for the `DeviseTokenAuth` controllers, which is used by default by Rails to protect against Cross-Site Request Forgery (CSRF) attacks. When using token-based authentication CSRF attacks are not a concern, so we can disable it for the `DeviseTokenAuth` controllers.

We also added the `skip_authenticate_user?` method to the `ApplicationController` to skip authentication for the `DeviseTokenAuth::RegistrationsController` when creating a new user or when loggin in a registered user. This is because the `DeviseTokenAuth::RegistrationsController` is used to create new users or to log in registered users, and we don't want to require authentication for this action.

This will make sure that the user is authenticated before accessing any action in the Alerts controller.

4. Now, on `app/controllers/alerts_controller.rb`, define the `index` action for listing alerts scoped to the authenticated user:

```ruby
def index
  @alerts = current_user.alerts
  render json: @alerts
end
```

This action fetches all alerts associated with the current authenticated user and returns them as a JSON response.

5. Define the `create` action for creating alerts scoped to the authenticated user and restricted to the `"portal_opened"` and `"portal_closed"` alert types:

```ruby
def create
  @alert = current_user.alerts.build(alert_params)

  if @alert.save
    render json: @alert, status: :created
  else
    render json: { errors: @alert.errors.full_messages }, status: :unprocessable_entity
  end
end

private

def alert_params
  params.require(:alert).permit(:alert_type, :tag, :description, :origin)
end
```

The `create` action builds a new alert associated with the current authenticated user and saves it. If successful, it returns the created alert as a JSON response with a `:created` status. If there's an error (such as an invalid `alert_type`), it returns an error message with an `:unprocessable_entity` status.

The `alert_params method` is a private method that defines the permitted parameters for creating an alert.

6. Finally, update your `config/routes.rb` file to add routes for the index and create actions of the Alerts controller:

```ruby
Rails.application.routes.draw do
  # ... other routes ...

  resources :alerts, only: [:index, :create]
end
```

With these changes, you have successfully created the Alerts controller with the `create` and `index` actions scoped to the authenticated user and restricted the creation of alerts to the desired alert types. You can now move on to the next steps in your roadmap.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

---

### 2.6. Install and configure CORS

1. Add the `rack-cors` gem to your Gemfile:

```ruby
gem 'rack-cors'
```

2. Run `bundle install` in your terminal to install the `rack-cors` gem.

```bash
bundle install
```

3. To configure CORS, open the `config/application.rb` file and add the following code inside the `class Application < Rails::Application` block:

```ruby
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'example.com', 'localhost:3000', 'localhost:3001', /http:\/\/localhost:\d+/
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
      max_age: 0
  end
end
```

Replace the origins values with the appropriate domains that you want to allow requests from. In this example, I've allowed requests from `example.com`, `localhost:3000`, and `localhost:3001`. The regular expression `/http:\/\/localhost:\d+/` also allows requests from any port on `localhost`.

The `resource` block specifies the allowed headers, methods, exposed headers, and max age for the preflight request. The `expose` option is particularly important for token authentication, as it exposes the necessary headers for Devise Token Auth.

With these steps completed, your Rails application will now accept requests from the specified origins, allowing you to make cross-origin API requests from the front-end applications hosted on those domains.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

---

### 2.7. Test the application

We will test the application at this stage to ensure everything is working as expected before proceeding with the front-end. Here's what you can do to test your application:

1. Start the Rails server by running the following command in your terminal:

```bash
rails server
```

We will use [Postman](https://www.postman.com/) to make API requests to our Rails application. In the following request, we'll use the `x-www-form-urlencoded` content type, but you can also use the `application/json` content type. The `x-www-form-urlencoded` content type is easier to use with Postman, but the `application/json` content type is more common in production applications.

2. First, test user authentication:
   - Register a new user with a POST request to `/auth` with the required parameters (`email`, `password`, and `password_confirmation`):
     - Change the request type to "POST" using the dropdown menu next to the URL input field.
     - Enter the URL for user registration: `http://localhost:3000/auth`
     - Click on the "Body" tab below the URL input field.
     - Select the "x-www-form-urlencoded" radio button.
     - Add the required parameters:
       - email: `test@test.com`
       - password: `testpassword`
       - password_confirmation: `testpassword`
     - Click on the "Send" button to send the request.
       - If the request is successful, you should see a response with a `200` status code and a JSON response containing the user's authentication headers:

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

  - Request a user log in with a POST request to `/auth/sign_in` with the required parameters (`email` and `password`):
    - Change the request to "POST and enter the URL for user log in: `http://localhost:3000/auth/sign_in`
    - Click on the "Body" tab and select the "x-www-form-urlencoded" radio button.
    - Add the email and password parameters as key-value pairs.
    - Click "Send" to make the request.
    - In the response, find the `access-token`, `client`, and `uid` headers. You'll need these for authenticated requests.

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

In this request, we had the following `access-token`, `client` and `uid` headers:

  - `acces-token`: 9GLt5RzG9XvsGMT5pWLDzQ
  - `client`: hRrMSY9LVH1jIk4NwdbnUw
  - `uid`: test@test.com

3. Next, test the alerts controller:
   - Set up the request to create a new alert by changing request type to POST
   - Enter the URL to create an alert: `http://localhost:3000/alerts`
   - Click on the "Headers" tab and add the `access-token`, `client`, and `uid` headers with their respective values. Also, add the `Content-Type` header with the value `application/json`.
   - Click on the "Body" tab and select the "raw" radio button, and then select "JSON" from the dropdown menu.
   - Add a JSON object with the required `alert_type`, `tag`, `description` and `origin` parameters such as

```JSON
{
  "alert_type": "portal_opened",
  "tag": "example-tag",
  "description": "An example alert",
  "origin": "example.com"
}
```

   - Click on the "Send" button to send the request. If the request is successful, you should see a response with a `200` status code and a JSON response containing the alert data:

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

   - If the request is not successful, you should see a response with a `401` status code and a JSON response containing an error message:

```json
{
    "errors": [
        "Alert type must be of type 'portal_opened' or 'portal_closed'"
    ]
}
```

   - And finally, to request the list of alerts
     - Create a new request of type GET
     - Enter the URL to fetch alerts: `http://localhost:3000/alerts`
     - Click on the "Headers" tab and add the `access-token`, `client`, and `uid` headers with their respective values from the login response.
     - Click "Send" to make the request. If the request is successful, you should see a response with a `200` status code and a JSON response containing the list of alerts:

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

If everything is set up correctly, you should be able to register, log in, and interact with the Alerts API. Remember to update the access token in the headers whenever it expires or you log in again, as it may change upon each successful authentication.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

---

### 2.8. Install and configure Tailwind CSS

1. Make sure you have added the webpacker gem to your `Gemfile`:

```ruby
gem 'webpacker', '~> 5.0'
```

2. Run `bundle install` to install the new dependencies.

3. Install Webpacker by running:

```bash
rails webpacker:install
```

4. Now, you will install Tailwind CSS, PostCSS, and Autoprefixer using npm or yarn. Navigate to the root of your Rails application and run the following command, using npm:

```bash
npm install tailwindcss@latest postcss@latest autoprefixer@latest
```

5. Create a new CSS file in `app/assets/stylesheets` called `application.scss` and add the following content:

```scss
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

You can rename the `application.css` file to `application.scss`. This will allow you to use SCSS syntax and features in your stylesheets.

1. Next, you need to configure PostCSS. Update `postcss.config.js` file in the root of your Rails application with the following content:

```javascript
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    })
  ]
}
```

This configuration will ensure that tailwindcss and autoprefixer are included along with the other plugins that were already in the file.

7. Import the styles into your JavaScript pack. Open `app/javascript/packs/application.js` and add the following line:

```javascript
import "stylesheets/application.scss"
```

8. Open `app/views/layouts/application.html.erb` and add the following lines inside the `<head>` tag:

```erb
<%= stylesheet_pack_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
```

This line will include the JavaScript pack in your layout file, which will load the Tailwind CSS styles. You might have to change line `<%= javascript_importmap_tags %>`, which is generated by the webpacker gem, to `<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>`. This will ensure that the JavaScript pack is loaded in the layout file.

9. Now, you need to configure Tailwind CSS. Create a configuration file by running the following command in the root of your Rails application:

```bash
npx tailwindcss init
```

This will generate a `tailwind.config.js` file in your project root. You can customize your configuration according to your needs. For more information, check the [Tailwind CSS documentation](https://tailwindcss.com/docs/configuration).

10. Before testing the viewpage, we can temporarily disable the authentication requirement for the alerts API. Open `app/controllers/application_controller.rb` and comment out the `before_action :authenticate_user!` line.

We have now installed and configured Tailwind CSS. You can now create a view page to test the Tailwind CSS styles.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

---

### 2.9. Create the Alerts view

1. Create a new file `index.html.erb` inside the `app/views/alerts` directory. If the alerts directory does not exist, create it first.

2. Add the following code to the `index.html.erb` file:

```html
<main class="container mx-auto mt-8">
  <h2 class="mb-4 text-xl">All Alerts</h2>
  <table class="w-full border-collapse">
    <thead>
      <tr>
        <th class="border p-2 bg-light-gray">Alert Type</th>
        <th class="border p-2 bg-light-gray">Tag</th>
        <th class="border p-2 bg-light-gray">Description</th>
        <th class="border p-2 bg-light-gray">Origin</th>
      </tr>
    </thead>
    <tbody>
      <% @alerts.each_with_index do |alert, index| %>
        <tr class="<%= index.even? ? 'bg-light-gray' : 'bg-lighter-gray' %>">
          <td class="border p-2"><%= alert.alert_type %></td>
          <td class="border p-2"><%= alert.tag %></td>
          <td class="border p-2"><%= alert.description %></td>
          <td class="border p-2"><%= alert.origin %></td>
        </tr>
      <% end %>
    </tbody>
  </table>
</main>

<footer class="bg-light-blue text-white py-4 text-center mt-8">
  <p>&copy; <%= Time.now.year %> Aperture Labs. All rights reserved.</p>
</footer>
```

3. Add the custom colors to your Tailwind CSS configuration in `tailwind.config.js`:

```javascript
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'dark-blue': '#1C2A48',
        'light-blue': '#365F9C',
        'light-gray': '#F5F5F5',
        'lighter-gray': '#FAFAFA',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

4. Update your `config/routes.rb` to route the root path to the alerts view:

```ruby
Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  resources :alerts, only: [:index, :create]

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "alerts#index"
end
```

You have successfully created the Alerts view with a simple yet elegant design. The page features a dark blue background header displaying "Alert Overview" and a white background body section containing the title "All alerts" as well as a table listing the alerts.

To see the new view in action, follow these steps:

- In your terminal, run the Rails server: `rails s`
- Open your web browser and navigate to `http://localhost:3000/`. You should now see the "Alert Overview" page displaying the alerts table with alternating shades of light grey for each row.

If you need to make any modifications to the design or layout, you can adjust the HTML and Tailwind CSS classes in the `alerts.html.erb` file. For example, you can change the header background color or text size by modifying the corresponding CSS classes in the `<header>` tag.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

---

### 2.10. Write instructions

The README file in this repository contains all the instructions you need to run the application. You can also find the instructions in the [README.md](readme.md) file in the root of this repository. Also, this file contains the instructions for the project roadmap and implementation.

<div style="text-align: right">

[BACK TO TOP](#beezen-alert-system-project-roadmap-and-implementation)

</div>

---

## 3. TECHNOLOGIES USED OVERVIEW

To be implemented.
