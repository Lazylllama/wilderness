# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_08_17_015957) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "flipper_features", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "key", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "index_flipper_features_on_key", unique: true
  end

  create_table "flipper_gates", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "feature_key", null: false
    t.string "key", null: false
    t.datetime "updated_at", null: false
    t.text "value"
    t.index ["feature_key", "key", "value"], name: "index_flipper_gates_on_feature_key_and_key_and_value", unique: true
  end

  create_table "log_transactions", force: :cascade do |t|
    t.integer "amount", null: false
    t.datetime "created_at", null: false
    t.string "memo"
    t.string "source", null: false
    t.bigint "sourceable_id"
    t.string "sourceable_type"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["sourceable_type", "sourceable_id"], name: "index_log_transactions_on_sourceable_unique", unique: true
    t.index ["user_id"], name: "index_log_transactions_on_user_id"
  end

  create_table "ship_submissions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "review_notes"
    t.datetime "reviewed_at"
    t.bigint "reviewer_id"
    t.string "status", default: "pending", null: false
    t.integer "submitted_seconds", default: 0, null: false
    t.bigint "tent_id", null: false
    t.datetime "updated_at", null: false
    t.index ["reviewer_id"], name: "index_ship_submissions_on_reviewer_id"
    t.index ["tent_id"], name: "index_ship_submissions_on_tent_id"
    t.index ["tent_id"], name: "index_ship_submissions_one_pending_per_tent", unique: true, where: "((status)::text = 'pending'::text)"
  end

  create_table "shop_items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "image_url"
    t.integer "price"
    t.string "title"
    t.datetime "updated_at", null: false
  end

  create_table "tents", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "demo_url"
    t.text "description"
    t.json "hackatime_projects", default: [], null: false
    t.integer "hackatime_seconds", default: 0, null: false
    t.datetime "hackatime_synced_at"
    t.datetime "last_heartbeat_at"
    t.string "name", null: false
    t.integer "paid_seconds", default: 0, null: false
    t.integer "plot_index"
    t.string "repo_url"
    t.datetime "shipped_at"
    t.string "status", default: "pitched", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id", "plot_index"], name: "index_tents_on_user_id_and_plot_index", unique: true
    t.index ["user_id"], name: "index_tents_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.text "access_token"
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "first_name"
    t.jsonb "hackatime_snapshot", default: [], null: false
    t.datetime "hackatime_synced_at"
    t.string "hc_uid"
    t.datetime "last_logged_at"
    t.string "last_name"
    t.string "name"
    t.text "refresh_token"
    t.datetime "rsvped_at"
    t.string "slack_id"
    t.integer "streak_days", default: 0, null: false
    t.datetime "token_expires_at"
    t.datetime "updated_at", null: false
    t.string "verification_status"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["hc_uid"], name: "index_users_on_hc_uid", unique: true
    t.index ["rsvped_at"], name: "index_users_on_rsvped_at"
  end

  add_foreign_key "log_transactions", "users"
  add_foreign_key "ship_submissions", "tents"
  add_foreign_key "ship_submissions", "users", column: "reviewer_id"
  add_foreign_key "tents", "users"
end
