module Admin
  class ProjectsController < BaseController
    def index
        tents = Tent.includes(:user).order(hackatime_seconds: :desc).limit(100)
        render inertia: "admin/projects", props: {
            projects: tents.map {|tent| project_props(tent, snapshots)},
            totals: {
                projects.tents..count,
                claimed: Tent.where.not(hackatime_projects: []).count,
                hours: (Tent.sum(:hackatime_seconds).to_f/3600).round
            },
            flash_notice: flash_notice
        }
    end

    private
    def snapshots
        @snapshots ||= User.where(id: Tent.select(:user_id)).to_h {
            [user.id, (user.hackatime_snapshot || []).index_by {|project| project["name"]}]
        }
    end

    def project_props(tent, snapshot_index)
        claimed = tent.hackatime_projects.map {|name|
        entry = snapshot_index.dig(tent.user_id, name)
    {
        name: name,
        hours: entry? (entry["total_seconds"].to_f/3600).round(1): nil
    }}
    {
        id: tent.id,
        name: tent.name,
        owner: tent.user.display_name,
        owner_email: tent.user.email,
        hours: tent.hours.round(1),
        heat_tier: tent.heat_tier,
        status: tent.status,
        repo_url: tent.repo_url,
        demo_url: tent.demo_url,
        synced_at: tent.hackatime_synced_at,
        hackatime: claimed
    }
end
end
end