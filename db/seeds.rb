Admin::FlagsController::FLAGS.each { |name| Flipper.add(name) }

if (email = ENV["BOOTSTRAP_ADMIN_EMAIL"]).present?
  user = User.find_by(email: email)
  user&.update!(admin: true)
  puts user ? "promoted #{email} to admin" : "no user with email #{email}, sign in first"
end

if Rails.env.development?
  items = [
    { title: "sticker pack", kind: "provision", stock_remaining: nil, position: 0,
      description: "a fistful of vinyl for the laptop lid.",
      logs: { "xx" => 25 } },
    { title: "cool pin", kind: "gear", stock_remaining: 200, position: 1,
      description: "a little brass campfire for your bag.",
      logs: { "us" => 120, "eu" => 150, "xx" => 180 } },
    { title: "mechanical keyboard", kind: "gear", stock_remaining: 15, position: 2,
      description: "for hours that sound as good as they count.",
      logs: { "us" => 2400, "eu" => 2700, "ca" => 2600, "xx" => 3200 } },
    { title: "domain for a year", kind: "provision", stock_remaining: nil, position: 3,
      description: "plant a flag where anyone can find it.",
      logs: { "xx" => 600 } }
  ]

  items.each do |attrs|
    attrs = attrs.dup
    prices = attrs.delete(:logs)
    stock = attrs.delete(:stock_remaining)

    item = ShopItem.find_or_initialize_by(title: attrs[:title])
    item.stock_remaining = stock if item.new_record?
    item.update!(attrs.merge(stocked: true))

    prices.each do |region, logs|
      item.prices.find_or_initialize_by(region: region).update!(logs: logs)
    end
  end
end