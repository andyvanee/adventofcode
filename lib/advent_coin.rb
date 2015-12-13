require 'digest'

module AdventCoin
  def self.for(input)
    i = 0
    while i = i+1
      return i if Digest::MD5.hexdigest(input + i.to_s)[0..4] == '00000'
    end
  end
end
