class SessionsController < ApplicationController
    def create
        user = User.from_omniauth(request.env["omniauth.auth"])
        sign_in(user)
        redirect_to dashboard_path, notice: "welcome to the wilderness, #{user.display_name}"
    end

    def destroy
        sign_out
        redirect_to root_path, notice: "fire's out. see you again soon..."
    end

    def failure
    redirect_to root_path, alert: "couldn't light that match (#{params[:message]||"unknown"})"
  end
end
