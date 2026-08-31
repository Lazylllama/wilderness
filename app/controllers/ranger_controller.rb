class RangerController < InertiaController
  before_action :require_camp_access
  before_action :require_authentication

  def index
    render inertia: "ranger/index", props: {
      connected: current_user.hackatime_connected?,
      synced_at: current_user.hackatime_synced_at,
      project_count: (current_user.hackatime_snapshot || []).size
    }
  end
end
