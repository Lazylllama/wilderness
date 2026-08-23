module Admin
  class FlagsController < BaseController
    FLAGS = %w[camp release].freeze

    def index
      render inertia: "admin/flags", props: {
        flags: FLAGS.map { |name|
          {
            name: name,
            enabled: Flipper.enabled?(name),
            actors: Flipper[name].gate_values.actors.size
          }
        },
        flash_notice: flash_notice
      }
    end
    def update
        name = params[:name]
        return redirect_to(admin_flags_path) unless FLAGS.include?(name)
        Flipper.enabled?(name)? Flipper.disable(name): Flipper.enable(name)
        redirect_to admin_flags_path,
        notice: "#{name} is now #{Flipper.enabled?(name)? 'admin': 'not'}"
    end
  end
end
