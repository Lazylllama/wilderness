class AddRsvpToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :rsvped_at, :datetime
    add_column :users, :access_token, :text
    add_column :users, :refresh_token, :text
    add_column :users, :token_expires_at, :datetime
    add_index :users, :rsvped_at
  end
end
