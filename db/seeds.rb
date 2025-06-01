# Clear existing users to avoid duplicates
User.destroy_all

# Create sample users
users = [
  {
    name: "Daniel Torres",
    email_address: "daniel@gmail.com",
    password: "password123"
  },
  {
    name: "Jane Smith",
    email_address: "jane@example.com",
    password: "password123"
  },
  {
    name: "Alice Johnson",
    email_address: "alice@example.com",
    password: "password123"
  }
]

users.each do |user_data|
  User.create!(user_data)
end

puts "Created #{User.count} users"
