class RsvpController < ApplicationController
  def create
    # create a user with the email provided in the params
    # user = User.create(email: params[:email])

    # todo: wait lowk this isnt what i wanna do,
    # lets make them sign in like normal then add them to all
    # our channels etc with ze slack id

    redirect_to root_path, notice: {
        title: "you press button",
        description: "thank you for pressing the button, i will now just say random stuff to fill out this space of emptiness",
        iconName: "Tent",
        variant: "normal"
    }
  end
end
