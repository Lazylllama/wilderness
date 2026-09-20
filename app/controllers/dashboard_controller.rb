class DashboardController < InertiaController
  before_action :require_camp_access
  before_action :require_authentication

  def index
    render inertia: "camp/index", props: {
      camp: {
        total_hours: projects.sum(&:hours).round(1),
        fire_state: current_user.fire_state,
        streak: current_user.streak,
        logs_balance: current_user.logs_balance,
        plot_count: 8
      },
      projects: projects.map { |project| project_props(project) },
      hackatime_projects: hackatime_projects(projects)
    }
  end

  private

  def projects
    @projects ||= current_user.projects.order(:plot_index).to_a
  end

  def project_props(project)
    project.as_json(only: %i[id name description repo_url demo_url hackatime_projects status plot_index last_heartbeat_at hackatime_synced_at shipped_at])
      .merge("hours" => project.hours.round(1), "logs" => project.logs_pending, "project_tier" => project.project_tier)
  end

  def hackatime_projects(projects)
    owner = projects.flat_map { |project| project.hackatime_projects.map { |name| [ name, project.name ] } }.to_h

    (current_user.hackatime_snapshot || []).map do |entry|
      entry.slice("name", "total_seconds").merge("claimed_by" => owner[entry["name"]])
    end
  end
end
