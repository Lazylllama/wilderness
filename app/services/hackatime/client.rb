require "net/http"

module Hackatime
    class Client
        BASE_URL = "https://hackatime.hackclub.com/api/v1".freeze
        USER_AGENT = "wilderness (hackclub)".freeze
        TIMEOUT = 10

        def initialize(identifier = nil, token: nil)
            raise ArgumentError, "identifier or token required" if identifier.blank? && token.blank?
            @identifier = identifier.to_s
            @token = token
        end

        def me
            get("authenticated/me")
        end

        def projects(since: Rails.configuration.x.wilderness.program_start)
            if @token
                get("authenticated/projects").fetch("projects", [])
            else
                get("users/#{CGI.escape(@identifier)}/projects/details",
                start_date: since&.to_date&.iso8601).fetch("projects", [])
            end
        end


        def trust_factor
            get("users/#{CGI.escape(@identifier)}/trust_factor")
        end

        private
        def get(path, **params)
            uri = URI("#{BASE_URL}/#{path}")
            query = params.compact
            uri.query = URI.encode_www_form(query) if query.any?

            request_headers = { "User-Agent" => USER_AGENT }
            request_headers["Authorization"] = "Bearer #{@token}" if @token

            response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: TIMEOUT, read_timeout: TIMEOUT) do |http|
                http.get(uri.request_uri, request_headers)
            end

            case response
            when Net::HTTPSuccess then JSON.parse(response.body)
            when Net::HTTPNotFound
                raise NotFound, "no hackatime account for #{@identifier}"
            when Net::HTTPForbidden
                raise StatsPrivate, "turn on public stats in your hackatime settings https://hackatime.hackclub.com/my/settings/privacy"
            else
                raise Error, "hackatime responded #{response.code}"
            end
        end
    end
end
