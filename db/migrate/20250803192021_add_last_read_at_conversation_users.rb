class AddLastReadAtConversationUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :conversation_users, :last_read_at, :datetime

    # We know that a user has definitely read a given conversation up to the point of
    # the last message they wrote in it so we could set the :last_read_at column
    # for each conversation they are a participant in to that timestamp

    ConversationUser.reset_column_information # reload the schema information

    ConversationUser.find_each do |conversation_user|
      last_message = conversation_user.conversation.messages.where(user_id: conversation_user.user_id).order(created_at: :desc).first

      if last_message
       conversation_user.update(last_read_at: last_message.created_at)
      end
    end
  end
end
