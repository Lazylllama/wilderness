module Admin
  class ProjectsController < BaseController
    def index
        tents = Tent.includes(:user).order(hackatime_seconds: :desc).limit(100)
        render inertia: "admin/projects" {
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
        claimed