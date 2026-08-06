class LandingController < InertiaController
  def index
    @items = ShopItem.all

    render inertia: {
      release_flipper: Flipper.enabled?(:release),
      hour_multipliers: Tier::HOUR_MULTIPLIER,
      base_hour_rate: Tier::BASE_HOUR_RATE,
      items: @items.map do |item|
        {
          id: item.id,
          title: item.title,
          price: item.price,
          image_url: item.image_url
        }
      end
    }
  end
end
