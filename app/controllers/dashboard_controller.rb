class DashboardController < InertiaController
  before_action :require_authentication

  def index
    tents = current_user.tents
    render inertia: "camp/index", props: {
        camp: {
          total_hours: tents.sum(&:hours).round(1),
          fire_state: current_user.fire_state,
          streak: current_user.streak,
          logs_balance: 0,
          plot_count: 8
        },
        tents: tents.map { |tent| tent_props(tent) },
        hackatime_projects: hackatime_projects(tents)
    }
  end

  private
  def tent_props(tent)
    tent.as_json(only: %i[id name description repo_url demo_url hackatime_projects status plot_index last_heartbeat_at hackatime_synced_at shipped_at])
    .merge("hours"=> tent.hours.round(1), "logs"=> tent.logs, "heat_tier" => tent.heat_tier)
  end

  def hackatime_projects(tents)
    return [] # hackatime_snapshot doesnt exist
    owner = tents.flat_map { |tent| tent.hackatime_projects.map { |name| } }.to_h

    (current_user.hackatime_snapshot || []).map do |project|project.slice("name", "total_seconds").merge("claimed_by"=> owner[project["name"]])
  end
  end
end
