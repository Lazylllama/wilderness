module Hackatime
    class Connection
    TOKEN_URL = "https://hackatime.hackclub.com/oauth/token".freeze
    REVOKE_URL = "https://hackatime.hackclub.com/oauth/revoke".freeze

    def initialize(user) = @user = user

    def complete!(code:, redirect_uri:)
        token = exchange(code, redirect_uri).fetch("access_token")
        profile = Client.new(token: token).me

        @user.update!(
            hackatime_access_token: token,
            hackatime_uid: profile["id"],
            hackatime_trust_level: profile.dig("trust_factor", "trust_level"),
            hackatime_connected_at: Time.current
        )
    end

    def revoke!
        post(REVOKE_URL, token: @user.hackatime_access_token) if @user.hackatime_access_token.present?
        @user.update!(
        hackatime_access_token: nil,
        hackatime_uid: nil,
        hackatime_connected_at: nil
      )
    end

    private
    def exchange(code, redirect_uri)
        post(TOKEN_URL,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri)
    end

    def post(url, **params)
        uri = URI(url)
        response = Net::HTTP.post_form(uri, params.merge(
            client_id: ENV.fetch("HACKATIME_CLIENT_ID"),
            client_secret: ENV.fetch("HACKATIME_CLIENT_SECRET")
        ))

        raise Error, "hackatime responded #{response.code}" unless response.is_a?(Net::HTTPSuccess)
        response.body.present? ? JSON.parse(response.body) : {}
    end
    end
end
