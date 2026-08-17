class CreateLogTransactions < ActiveRecord::Migration[8.1]
  def change
    create_table :log_transactions do |t|
      t.timestamps
    end
  end
end
