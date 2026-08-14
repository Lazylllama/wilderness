class CreateTents < ActiveRecord::Migration[8.1]
  def change
    create_table :tents do |t|
      t.timestamps
    end
  end
end
