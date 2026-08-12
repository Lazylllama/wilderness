require "net/http"

module Hackatime
    class Client
        BASE_URL = "https://hackatime.hackclub.com/api/v1".freeze
        USER_AGENT = "wilderness (hackclub)".freeze
        TIMEOUT = 10

        def initialize(identifier)
            raise ArgumentError, "identifier required" if identifier.blank?
            @identifier = identifier.to_s
        end

        def projects(since: Rails.configuration.x.wilderness.program_start)
            get("users/#{CGI.escape(@identifier)}/projects/details",
          start_date: since&.to_date&.iso8601).fetch("projects", [])
        end


        def trust_factor
            get("users/#{CGI.escape(@identifier)}/trust_factor")
        end

        private
        def get(path, **params)
            uri = URI("#{BASE_URL}/#{path}")
            query = params.compact
            uri.query = URI.encode_www_form(query) if query.any?
            response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: TIMEOUT, read_timeout: TIMEOUT) do |http| http.get(uri.request_uri, "User-Agent"=> USER_AGENT)
            end

            case response
            when Net::HTTPSuccess then JSON.parse(response.body)
            when Net::HTTPNotFound
                raise NotFound, "no public hackatime stats for #{@identifier}"
            else
                raise Error, "hackatime responded #{response.code}"
            end
        rescue JSON::ParserError, Timeout::Error, SystemCallError, IOError=> e
            raise Error, "hackatime request failed (#{e.class})"
        end
    end
end
