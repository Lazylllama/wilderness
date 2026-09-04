class AddShopFieldsToShopItems < ActiveRecord::Migration[8.1]
  def change
    add_column :shop_items, :kind, :string, null: false, default: "gear"
    add_column :shop_items, :description, :text
    add_column :shop_items, :stocked, :boolean, null: false, default: false
    add_column :shop_items, :stock_remaining, :integer
    add_column :shop_items, :position, :integer, null: false, default: 0

    add_index :shop_items, %i[stocked position]
  end
end