class RenameTentsToProjects < ActiveRecord::Migration[8.1]
  def change
    rename_table :tents, :projects

    rename_column :ship_submissions, :tent_id, :project_id
    rename_index :ship_submissions,
      "index_ship_submissions_one_pending_per_tent",
      "index_ship_submissions_one_pending_per_project"
  end
end
