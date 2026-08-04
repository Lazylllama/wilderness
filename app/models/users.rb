class User < ApplicationRecord
    def self.from_omniauth(auth)
    user = find_or_initialize_by(hc_uid: auth.uid)

    user.email = auth.info.email
    user.name = auth.info.name
    user.first_name = auth.info.first_name
    user.last_name = auth.info.last_name
    user.slack_id = auth.info.slack_id
    user.verification_status = auth.info.verification_status
    user.save!
    user
    end