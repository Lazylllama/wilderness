class CreateShipSubmissions < ActiveRecord::Migration[8.1]
  def change
    create_table :ship_submissions do |t|
      t.references :tent, null: false, foreign_key: true
      t.references :reviewer, foreign_key: { to_table: :users }
      t.integer :submitted_seconds, null: false, default: 0
      t.string :status, null: false, default: "pending"
      t.text :review_notes
      t.datetime :reviewed_at
      t.timestamps
    end

    add_index :ship_submissions, :tent_id, unique: true,
      where: "status = 'pending'",
      name: "index_ship_submissions_one_pending_per_tent"
  end
end
