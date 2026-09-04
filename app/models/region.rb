class Region
  FALLBACK = "xx".freeze

  ALL = {
    "us" => "United states",
    "ca" => "Canada",
    "eu" => "Europe & UK",
    "in" => "India",
    "au" => "Australia & NZ",
    FALLBACK => "rest of the world"
  }.freeze

  def self.codes = ALL.keys

    def self.label(code) = ALL.fetch(normalize(code))

  def self.normalize(code)
    code = code.to_s.downcase
    codes.include?(code)? code : FALLBACK
  end
end