module NaughtyStrings
    def self.nice_string(x)
        not_forbidden(x) && double_letter(x) && three_vowels(x)
    end

    def self.three_vowels(input)
        vowels = %w(a e i o u)
        vowel_count = 0
        input.split('').each do |i|
            vowel_count += 1 if vowels.include?(i)
        end
        vowel_count >= 3
    end

    def self.double_letter(input)
        input.split('')[1..-1].each_index do |i|
            return true if input[i] == input[i+1]
        end
        false
    end

    def self.not_forbidden(input)
      ['ab', 'cd', 'pq', 'xy'].each do |x|
        return false if input.include?(x)
      end
      true
    end
end
