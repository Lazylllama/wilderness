require "net/http"

module Hackatime
    class Client
        BASE_URL = "https://hackatime.hackclub.com/api/v1"
        USER_AGENT = "wilderness (hackclub)".freeze
        TIMEOUT = 10

        def initialize(identifier)
            raise ArgumentError,"identifier required" if identifier.blank?