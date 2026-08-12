class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  def self.from_omniauth(auth)
    user = find_or_initialize_by(hc_uid: auth.uid)

    user.email = auth.info.email
    user.name = auth.info.name
    user.first_name = auth.info.first_name
    user.last_name = auth.info.last_name
    user.slack_id = auth.info.slack_id
    user.verification_status = auth.info.verification_status.to_s
    user.save!
    user
  end

  def display_name
    name.presence || first_name.presence|| email.split("@").first
  end

  has_many :tents, dependent: :destroy

  def hackatime_identifier
    slack_id.presence||email
  end


  def streak
    return 0 if last_logged_at.blank?((Date.current-last_logged_at.to_date).to_i <=1)? streak_days: 0
  end

  def fire_state
    hours = tents.sum(&:hours)
    case hours
      when 0...5 then "embers"
      when 5...20 then "smoldering"
      when 20...50 then "crackling"
      when 50...100 then "roaring"
      else "blazing"
end
