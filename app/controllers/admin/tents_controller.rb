module Admin
  class TentsController < BaseController
    def index
        tents = Tent.includes(:user).order(hackatime_seconds: :desc).limit(100)

        render inertia: "admin/tents", props: {
            tents: tents.map { |tent|
                {
                    id: tent.id,
                    name: tent.name,
                    owner: tent.user.display_name,
                    hours: tent.hours.round(1),
                    heat_tier: tent.heat_tier,
                    status: tent.status,
                    repo_url: tent.repo_url,
                    demo_url: tent.demo_url,
                    last_heartbeat_at: tent.last_heartbeat_at
                }
        },
        flash_notice: flash_notice
        }
    end
  end
end
