Rails.application.config.middleware.use OmniAuth::Builder do
  provider :hack_club,
    ENV["HACKCLUB_CLIENT_ID"],
    ENV["HACKCLUB_CLIENT_SECRET"],
    scope: "openid email name slack_id verification_status"
end
