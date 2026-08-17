class CreateShipSubmissions < ActiveRecord::Migration[8.1]
  def change
    create_table :ship_submissions do |t|
      t.timestamps
    end
  end
end
