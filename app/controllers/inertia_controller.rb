class InertiaController < ApplicationController
  inertia_share user: -> {
    next nil unless current_user

    {
      id: current_user.id,
      name: current_user.display_name,
      email: current_user.email,
      slack_id: current_user.slack_id,
      verification_status: current_user.verification_status,
      rsvped: current_user.rsvped?,
      admin: current_user.admin?,
      camp_access: current_user.camp_access?
    }
  }
end
