class AddHackatimeOauthToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :hackatime_access_token, :text
    add_column :users, :hackatime_uid, :string
    add_column :users, :hackatime_connected_at, :datetime
    add_column :users, :hackatime_trust_level, :string
  end
end