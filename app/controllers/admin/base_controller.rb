module Admin
    class BaseController < InertiaController
        before_action :require_authentication
        before_action :require_admin

        private

        def camp_actors
            @camp_actors ||= Flipper[:camp].gate_values.actors
        end

        def camp_open?
            return @camp_open if defined?(@camp_open)
            @camp_open = Flipper.enabled?(:camp)
        end

        def access?(user)
            user.admin? || camp_open? || camp_actors.include?(user.flipper_id)
        end
        def flash_notice
      notice.is_a?(String) ? notice : nil
    end
    end
end
