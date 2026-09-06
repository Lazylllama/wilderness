class CreateShopItemPrices < ActiveRecord::Migration[8.1]
    def change
    create_table :shop_item_prices do |t|
        t.references :shop_item, null: false, foreign_key: true, index: false
        t.string :region, null: false
        t.integer :logs, null: false
        t.timestamps
    end
    add_index :shop_item_prices, %i[shop_item_id region],
      unique: true, name: "index_shop_item_prices_on_item_and_region"
end
end