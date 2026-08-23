module Admin
  class UsersController < BaseController
    def index
      render inertia: "admin/users", props: {
        users: scoped_users.map { |user| user_props(user) },
        query: params[:q].to_s,
        flash_notice: flash_notice
      }
    end

    def update
      user = User.find(params[:id])

      case params[:field]
      when "admin"
        if user == current_user
          return redirect_to admin_users_path(q: params[:q].presence),
            notice: "you can't demote yourself."
        end
        user.update!(admin: !user.admin?)
      when "camp_access"
        if camp_actors.include?(user.flipper_id)
          Flipper.disable_actor(:camp, user)
        else
          Flipper.enable_actor(:camp, user)
        end
      end
    end

    private

    def scoped_users
      scope = User.order(Arel.sql("rsvped_at DESC NULLS LAST")).limit(100)
      query = params[:q].to_s.strip
      return scope if query.blank?

      scope.where(
        q: "%#{query}%"
      )
    end

    def tent_counts
      @tent_counts ||= Tent.group(:user_id).count
    end

    def user_props(user)
      {
        id: user.id,
        name: user.display_name,
        email: user.email,
        slack_id: user.slack_id,
        verification_status: user.verification_status,
        admin: user.admin?,
        camp_access: access?(user),
        actor_enabled: camp_actors.include?(user.flipper_id),
        rsvped_at: user.rsvped_at,
        tents_count: tent_counts.fetch(user.id, 0)
      }
    end
  end
end
