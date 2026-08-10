class ChangeHcUidNullOnUsers < ActiveRecord::Migration[8.1]
  def change
    change_column_null :users, :hc_uid, true
  end
end
