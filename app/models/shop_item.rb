class ShopItem < ApplicationRecord
    KINDS = %w[gear provision grant].freeze

    has_many :prices, class_name: "ShopItemPrice", dependent: :destroy

    validates :title, presence: true
    validates :kind, inclusion: {in: KINDS}

    scope :on_shelf, ->{where(stocked: true).order(:position, :id)}

    def unlimited? = stock_remaining.nil?

    def logs_for(region)
        by_region = prices.index_by(&:region)
        row = by_region[Region.normalize(region)] || by_region[Region::FALLBACK]
        row&.logs || price
    end

    def available_in?(region) = logs_for(region).present?

    def claim_stock!
        return true if unlimited?

        ShopItem.where(id: id).where("stock_remaining > 0").update_all("stock_remaining = stock_remaining - 1") == 1
    end

end
