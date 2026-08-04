class LandingController < InertiaController
  def index
    render inertia: {
      release_flipper: Flipper.enabled?(:release)
    }
  end
end
