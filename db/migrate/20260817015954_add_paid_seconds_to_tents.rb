class AddPaidSecondsToTents < ActiveRecord::Migration[8.1]
  def change
    add_column :tents, :paid_seconds, :integer, null: false, default: 0
  end
end
