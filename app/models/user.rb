class User < ApplicationRecord
  encrypts :access_token
  encrypts :refresh_token
  validates :email, presence: true, uniqueness: true
  include Flipper::Identifier

  scope :rsvped, -> { where.not(rsvped_at: nil) }
  def self.from_omniauth(auth)
    user = find_or_initialize_by(hc_uid: auth.uid)

    user.email = auth.info.email
    user.name = auth.info.name
    user.first_name = auth.info.first_name
    user.last_name = auth.info.last_name
    user.slack_id = auth.info.slack_id
    user.verification_status = auth.info.verification_status.to_s

    if (creds = auth.credentials)
      user.access_token = creds.token
      user.refresh_token = creds.refresh_token if creds.refresh_token.present?
      user.token_expires_at = Time.zone.at(creds.expires_at) if creds.expires_at
    end

    user.rsvped_at ||= Time.current
    user.save!
    user
  end
  def rsvped? = rsvped_at.present?
  def token_expired? = token_expires_at.present? && token_expires_at.past?

  has_many :log_transactions, dependent: :destroy
  def logs_balance = log_transactions.sum(:amount)

  def display_name
    name.presence || first_name.presence|| email.split("@").first
  end

  has_many :tents, dependent: :destroy

  def hackatime_identifier
    slack_id.presence||email
  end

  def streak
    return 0 if last_logged_at.blank?
    (Date.current - last_logged_at.to_date).to_i <= 1 ? streak_days.to_i : 0
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
  end

  def camp_access? = admin? || Flipper.enabled?(:camp, self)

  def self.rsvp_count = rsvped.count
end
