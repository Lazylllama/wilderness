module Admin
  class OverviewController < BaseController
    def index
      render inertia: "admin/overview", props: {
        stats: {
          rsvps: User.rsvped.count,
          with_access: User.select { |user| access?(user) }.size,
          admins: User.where(admin: true).count,
          tents: Tent.count,
          shipped: Tent.where(status: "shipped").count,
          hours: (Tent.sum(:hackatime_seconds).to_f / 3600).round
        },
        camp_open: camp_open?,
        recent: User.rsvped.order(rsvped_at: :desc).limit(8).map { |user|
          {
            id: user.id,
            name: user.display_name,
            email: user.email,
            rsvped_at: user.rsvped_at
          }
        },
        flash_notice: flash_notice
      }
    end
  end
end
