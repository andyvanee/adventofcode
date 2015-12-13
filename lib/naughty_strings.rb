module NaughtyStrings
    def self.nice_string(x)
        not_forbidden(x) && double_letter(x) && three_vowels(x)
    end

    def self.nicer_string(x)
        dual_letter_pair(x) && alternates_characters(x)
    end

    def self.dual_letter_pair(input)
        i = j = 0
        len = input.length-2
        while i <= len
            pair = input[i] + input[i+1]
            j = i+2
            while j <= len
                return true if input[j]+input[j+1] == pair
                j += 1
            end
            i += 1
        end
        false
    end

    def self.alternates_characters(input)
        input.split('')[0..-3].each_index do |i|
            return true if input[i] == input[i+2]
        end
        false
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
        input.split('')[0..-2].each_index do |i|
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
