class ShopController < InertiaController
  before_action :require_camp_access
  before_action :require_authentication

  def index
    render inertia: "shop/index", props: {
      items: ShopItem.order(:price).as_json(only: %i[id title price image_url]),
      logs_balance: current_user.logs_balance
    }
  end
end
