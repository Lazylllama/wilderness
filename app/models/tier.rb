class Tier
  BASE_HOUR_RATE = 80
  HOUR_MULTIPLIER = {
    kindling: 1,
    campfire: 1.125,
    bonfire: 1.25,
    wildfire: 1.5
  }.freeze

  def self.hour_rate(tier)
    BASE_HOUR_RATE * HOUR_MULTIPLIER[tier.to_sym]
  end
end
