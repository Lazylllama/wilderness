class CreateLogTransactions < ActiveRecord::Migration[8.1]
  def change
    create_table :log_transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :amount, null: false
      t.string :source, null: false
      t.references :sourceable, polymorphic: true, index: false
      t.string :memo
      t.timestamps
    end

    add_index :log_transactions, %i[sourceable_type sourceable_id],
      unique: true, name: "index_log_transactions_on_sourceable_unique"
  end
end
