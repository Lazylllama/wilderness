class AddCampFieldsToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :last_logged_at, :datetime
    add_column :users, :streak_days, :integer, null: false, default: 0
    add_column :users, :hackatime_snapshot, :jsonb, null: false, default: []
    add_column :users, :hackatime_synced_at, :datetime
  end
end
