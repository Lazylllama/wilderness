OmniAuth.config.full_host = ENV["APP_URL"] if ENV["APP_URL"].present?

OmniAuth.config.failure_raise_out_environments = []
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :hack_club,
    ENV["HACKCLUB_CLIENT_ID"],
    ENV["HACKCLUB_CLIENT_SECRET"],
    scope: "openid email name slack_id verification_status"
end
