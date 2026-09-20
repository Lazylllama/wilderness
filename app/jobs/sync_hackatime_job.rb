class SyncHackatimeJob < ApplicationJob
    queue_as :default

    def self.enqueue_all
    User.find_each { |user| perform_later(user) }
    end

    def perform(user)
      client = user.hackatime_connected? ?
        Hackatime::Client.new(token: user.hackatime_access_token):Hackatime::Client.new(user.hackatime_identifier)
      entries = client.projects
      user.update!(hackatime_snapshot: entries)
      by_name = entries.index_by { |entry| entry["name"] }

    user.projects.find_each do |project|
      claimed = project.hackatime_projects.filter_map { |name|by_name[name] }

      project.update!(
        hackatime_seconds: claimed.sum { |entry|entry["total_seconds"].to_i },
        last_heartbeat_at: claimed.filter_map { |entry|
          entry["most_recent_heartbeat"] || entry["last_heartbeat"]
        }.max,
        hackatime_synced_at: Time.current
      )
    end
  end
end
