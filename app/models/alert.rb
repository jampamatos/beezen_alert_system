class Alert < ApplicationRecord
  belongs_to :user

  validates :alert_type, inclusion: {
    in: %w[portal_opened portal_closed],
    message: "must be of type 'portal_opened' or 'portal_closed'"
  }
end
