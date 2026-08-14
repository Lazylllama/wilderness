class CreateTents < ActiveRecord::Migration[8.1]
  def change
    create_table :tents do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.text :description
      t.string :repo_url
      t.string :demo_url
      t.json :hackatime_projects, null: false, default: []
      t.integer :hackatime_seconds, null: false, default: 0
      t.datetime :last_heartbeat_at
      t.datetime :hackatime_synced_at
      t.string :status, null: false, default: "pitched"
      t.integer :plot_index
      t.datetime :shipped_at
      t.timestamps
    end
    add_index :tents, [:user_id, :plot_index], unique: true
  end
end
