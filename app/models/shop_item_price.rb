class ShopItemPrice < ApplicationRecord
    belongs_to :shop_item
    validates :region, inclusion: {in: Region.codes},uniqueness: {scope: :shop_item_id}
    validates :logs, numericality: {only_integer: true, greater_than_or_equal_to: 0}
    def region_label = Region.label(region)
end