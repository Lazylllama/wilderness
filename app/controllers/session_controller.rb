class SessionController < ApplicationController
    def create
        auth = request.env["omniauth.auth"]
        return redirect_to(root_path, alert: "that trail went nowhere, contact support") if auth.blank?

        user = User.from_omniauth(auth)
        sign_in(user)

        if user.camp_access?
            redirect_to camp_path, notice: "welcome to the wilderness, #{user.display_name}"

        else
            redirect_to root_path, notice: {
                title: "you're in, #{user.display_name}",
                description: "Keep an eye out when the wilderness opens...",
                iconName: "Tent",
                variant: "normal"
            }
        end

    rescue ActiveRecord::RecordInvalid=> e
        redirect_to root_path, alert: {
            title: "couldn't save your rsvp",
            description: e.record.errors.full_messages.to_sentence,
            iconName: "CircleAlert",
            variant: "warning"
        }
    end

    def destroy
        sign_out
        redirect_to root_path, notice: "fire's out. see you again soon..."
    end

    def failure
        redirect_to root_path, alert: {
            title: "couldn't light that match",
            description: params[:message]||"some error",
            iconName: "CircleAlert",
            variant: "warning"
    }
    end
end
