class DashboardController < InertiaController
  before_action :require_authentication

  def index
    render inertia: {
        camp: {
        logs: 0,
        streak: 0,
        tents: []
      }
    }
  end
end
