class RsvpController < ApplicationController
  def create
    # create a user with the email provided in the params
    # user = User.create(email: params[:email])

    # todo: wait lowk this isnt what i wanna do,
    # lets make them sign in like normal then add them to all
    # our channels etc with ze slack id

    # redirect_to root_path, notice: user.persisted? ? "Looking forward to seeing you :)" : "Something went wrong, please try again."
  end
end
