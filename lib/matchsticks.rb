module Matchsticks
    def Matchsticks.trim(x)
        x.gsub(/\\\\/, '-').gsub(/\\"/, '-').gsub(/"/, '').gsub(/\\x../, '-')
    end
    def Matchsticks.count(x)
        return x.length - Matchsticks.trim(x).length
    end
end
