class CreateOnlineUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :online_users do |t|
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
