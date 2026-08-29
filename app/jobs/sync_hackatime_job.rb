class SyncHackatimeJob < ApplicationJob
    queue_as :default

    def self.enqueue_all
    User.find_each { |user| perform_later(user) }
    end

    def perform(user)
      client = user.hackatime_connected? ?
        Hackatime::Client.new(token: user.hackatime_access_token):Hackatime::Client.new(user.hackatime_identifier)
      projects = client.projects
      user.update!(hackatime_snapshot: projects)
      by_name = projects.index_by { |project| project["name"] }

    user.tents.find_each do |tent|
      claimed = tent.hackatime_projects.filter_map { |name|by_name[name] }

      tent.update!(
        hackatime_seconds: claimed.sum { |project|project["total_seconds"].to_i },
        last_heartbeat_at: claimed.filter_map {|project|
          project["most_recent_heartbeat"] || project["last_heartbeat"]
        }.max,
        hackatime_synced_at: Time.current
      )
    end
  end
end
