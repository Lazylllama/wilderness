class Tent < ApplicationRecord
    belongs_to: user
    STATUSES = %w[pitched shipped approved].freeze
    TIERS = {
        "kindling"=> [0, 80],
        "campfire"=> [10, 90],
        "bonfire"=> [25, 100],
        "wildfire"=>  [40,120]
        .freeze
    }

    validates :status, inclusion: {in: STATUSES}
    validates :plot_index, presence: true: {scope: :user_id}

    def hours = hackatime_seconds.to_f/3600
    
    def heat_tier
        TIERS.select {|_, (minimum, _)| hours >= minimum}.keys.last||"kindling"
    end
    def logs = (hours * TIERS.fetch(heat_tier).last).round

end