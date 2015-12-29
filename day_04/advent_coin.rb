require 'digest'

module AdventCoin
  def self.for(input, len=5)
    end_range = len - 1
    init = (0..end_range).map { |i| '0' }.join
    i = 0
    while i = i+1
      return i if Digest::MD5.hexdigest(input + i.to_s)[0..end_range] == init
    end
  end
end
