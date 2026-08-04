class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      # fields from oauth docs, we gotta update them later on after hq verification
      t.string :hc_uid, null: false
      t.string :email, null: false
      t.string :name
      t.string :first_name
      t.string :last_name
      t.string :slack_id
      t.string :verification_status
      t.timestamps
    end
    add_index :users, :hc_uid, unique: true
  end
end
