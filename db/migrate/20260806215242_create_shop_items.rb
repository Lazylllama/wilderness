class CreateShopItems < ActiveRecord::Migration[8.1]
  def change
    create_table :shop_items do |t|
      t.string :title
      t.integer :price
      t.text :image_url

      t.timestamps
    end
  end
end
