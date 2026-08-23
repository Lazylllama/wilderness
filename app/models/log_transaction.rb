class LogTransaction < ApplicationRecord
    belongs_to :user
    belongs_to :sourceable, polymorphic: true, optional: true

    SOURCES = %w[ship_submission shop_purchase adjustment].freeze

    validates :source, inclusion: { in: SOURCES }
    validates :amount, numericality: { only_integer: true }
end
