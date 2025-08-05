class OnlineUser < ApplicationRecord
  belongs_to :user

  after_create_commit -> { broadcast_refresh_later_to(model_name.plural) }
  after_destroy_commit -> { broadcast_refresh_later_to(model_name.plural)}
end
