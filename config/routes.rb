Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  resources :alerts, only: [:index, :create]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "alerts#index"
end
