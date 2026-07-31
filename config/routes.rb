Rails.application.routes.draw do
  # public/home thing
  root "home#index"
  get "faq", to: "home#faq"

  resource :session, only: %i[new create destroy]

  get "sign-in", to: "sessions#new", as: :sign_in
  delete "sign-out", to: "sessions#destroy", as: :sign_out

  resource :tent, only: %i[show edit update]

  resources :projects do
    resources :hour_logs, only: %i[create]
  end

  resources :hour_logs, only: %i[destroy]

  namespace :shop do 
    root "items#index"
    resources :items,only: %i[show]
    resources :orders, only: %i[index create]
  end

  nameespace :admin do
    root "projects#index"
    resources :projects, only: %i[index show update]
    resources :orders,   only: %i[index update]
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
