class Tent < ApplicationRecord
    belongs_to :user
    has_many :ship_submissions, dependent: :destroy

    STATUSES = %w[pitched shipped approved].freeze
    TIERS = {
        "kindling"=> [ 0, 80 ],
        "campfire"=> [ 10, 90 ],
        "bonfire"=> [ 25, 100 ],
        "wildfire"=>  [ 40, 120 ]
    }.freeze
    SHIP_MINIMUM_HOURS = 1

    validates :status, inclusion: { in: STATUSES }
    validates :plot_index, presence: true, uniqueness: { scope: :user_id }
    validates :repo_url, :demo_url, format: { with: %r{\Ahttps?://}, allow_blank: true, message: "must start with http" }

    def hours = hackatime_seconds.to_f/3600
    def rate = TIERS.fetch(heat_tier).last

    def heat_tier
        TIERS.select { |_, (minimum, _)| hours >= minimum }.keys.last||"kindling"
    end
    def logs_paid = (paid_seconds.to_f/3600 * rate).round
    def logs_pending = ((hackatime_seconds-paid_seconds).to_f/3600 * rate).round

    def open_submission = ship_submissions.find_by(status: "pending")
    def shippable? = status.in?(%w[pitched changes_requested]) && hours >= SHIP_MINIMUM_HOURS

    def submit_for_review
        return false unless shippable
        transaction do
            ship_submissions.create!(
                submitted_seconds: hackatime_seconds,
                rate: rate, heat_tier: heat_tier,
                total_heartbeats: last_total_heartbeats
            )
            update!(status: "submitted")
        end
        true
    end
end
