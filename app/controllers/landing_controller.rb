class LandingController < InertiaController
  def index
    @items = ShopItem.all

    render inertia: {
      release_flipper: Flipper.enabled?(:release),
      camp_open: Flipper.enabled?(:camp),
      rsvp_count: User.rsvp_count,
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
      alert_data: flash_alert
    }
  end
  def test
    render inertia: {}
  end
  private
  def flash_alert
    raw = notice.presence || alert.presence
    return nil if raw.blank?
    raw = { "description" => raw } if raw.is_a?(String)
    {
      title: raw["title"].presence || "heads up",
      description: raw["description"].presence || "an error happened.",
      iconName: raw["iconName"].presence || "CircleAlert",
      variant: raw["variant"].presence || (alert.present? ? "warning" : "normal")
    }
  end
end
