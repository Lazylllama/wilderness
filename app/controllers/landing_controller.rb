class LandingController < InertiaController
  def index
    @items = ShopItem.all

    Rails.logger.debug "notice: #{notice.inspect}"

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
      end,
      alert_data: notice.present? ? {
          title: notice["title"] || "Alert",
          description: notice["description"] || "Something happened, but we don't know what.",
          iconName: notice["iconName"] || "CircleAlert",
          variant: notice["variant"] || "warning"
        }
       : nil
    }
  end

  def test
    render inertia: {}
  end
end
