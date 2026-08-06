class SyncHackatimeJob < ApplicationJob
    queue_as :default

    def self.enqueue_all
    User.find_each { |user| perform_later(user) }
    end

    def perform(user)
    by_name = Hackatime::Client.new(user.hackatime_identifier)
                .projects.index_by { |project|project["name"] }

    user.tents.find_each do |tent|
      claimed = tent.hackatime_projects.filter_map { |name|by_name[name] }

      tent.update!(
        hackatime_seconds: claimed.sum { |project|project["total_seconds"].to_i },
        last_heartbeat_at: claimed.filter_map { |project| project["last_heartbeat"] }.max,
        hackatime_synced_at: Time.current
      )
    end
  end
end
