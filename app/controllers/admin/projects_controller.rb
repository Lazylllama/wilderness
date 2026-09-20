module Admin
  class ProjectsController < BaseController
    def index
      projects = Project.includes(:user).order(hackatime_seconds: :desc).limit(100)
      render inertia: "admin/projects", props: {
        projects: projects.map { |project| project_props(project, snapshots) },
        totals: {
          projects: Project.count,
          claimed: Project.where.not(hackatime_projects: []).count,
          hours: (Project.sum(:hackatime_seconds).to_f / 3600).round
        },
        flash_notice: flash_notice
      }
    end

    private

    def snapshots
      @snapshots ||= User.where(id: Project.select(:user_id)).to_h do |user|
        [ user.id, (user.hackatime_snapshot || []).index_by { |entry| entry["name"] } ]
      end
    end

    def project_props(project, snapshot_index)
      claimed = project.hackatime_projects.map do |name|
        entry = snapshot_index.dig(project.user_id, name)
        {
          name: name,
          hours: entry ? (entry["total_seconds"].to_f / 3600).round(1) : nil
        }
      end

      {
        id: project.id,
        name: project.name,
        owner: project.user.display_name,
        owner_email: project.user.email,
        hours: project.hours.round(1),
        project_tier: project.project_tier,
        status: project.status,
        repo_url: project.repo_url,
        demo_url: project.demo_url,
        synced_at: project.hackatime_synced_at,
        hackatime: claimed
      }
    end
  end
end
