BookVoyager::Application.routes.draw do
  
  mount Base::API => '/'

  root "pages#home"
  
  get "/home", to: "pages#home", as: "home"

end
